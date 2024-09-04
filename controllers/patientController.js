const Patient = require('../models/patient');
const Bed = require('../models/bed');



exports.addPatient = async (req, res) => {
    // Explicitly check for each required field
    const { name, age, mobileNo, address, fees, disease } = req.body;

    if (name && age && mobileNo && address && fees && disease) {
        try {
            const patient = new Patient({
                name,
                age,
                mobileNo,
                address,
                fees,
                disease
            });

            const savedPatient=await patient.save(); // Save the patient data to the database
            console.log('Patient saved:', savedPatient);
            res.status(200).json({ result: "Success" }); // Respond with success status
        } catch (error) {
            console.error(error);
            res.status(500).json({ result: "Error saving patient data", error: error.message }); // Handle server errors
        }
    } else {
        res.status(400).json({ result: "FAILED", message: "All fields are required" }); // Respond with a bad request status
    }
};


// Get all patients
exports.getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).send(patients);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

exports.getPatientByName = (req, res) => {
    const patientName = req.params.name; // Accessing the captured name value
    Patient.find({ name: patientName })
        .then(patients => {
            if (!patients) {
                return res.status(404).json({ message: 'Patient not found' });
            }
            res.json(patients);
        })
        .catch(error => res.status(500).json({ error: error.message }));
};

exports.getPatientById = async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ result: 'Invalid ID format' });
        }

        // Fetch the patient by ID
        const patient = await Patient.findById(id);

        // Check if the patient was found
        if (!patient) {
            return res.status(404).json({ result: 'Patient not found' });
        }

        // Return the patient details
        res.status(200).json(patient);
    } catch (err) {
        console.error('Error querying patient:', err);
        res.status(500).json({ result: 'Server error' });
    }
};






// Update an existing patient
exports.updatePatient = async (req, res) => {
    try {
        const id = req.params.id; // Extract the id from URL parameters
        console.log(id);
        const updates = req.body;

        const patient = await Patient.findByIdAndUpdate(id, updates, { new: true });
        if (!patient) return res.status(404).send('Patient not found');

        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ result: 'error' });
    }
};

exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByIdAndDelete(id);
        if (!patient) return res.status(404).send('Patient not found');

        res.status(200).send({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
