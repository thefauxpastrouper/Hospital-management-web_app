const Patient = require('../models/patient');
const Bed = require('../models/bed');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('bed');
        res.status(200).send(patients);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('bed');
        if (!patient) return res.status(404).send('Patient not found');

        res.status(200).send(patient);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.addPatient = async (req, res) => {
    try {
        const { name, urgency, appointmentTime, isEmergency, status, admissionDate, bedId, treatments } = req.body;

        // Validate if bed exists
        if (bedId) {
            const bed = await Bed.findById(bedId);
            if (!bed) return res.status(404).send('Bed not found');
        }

        const patient = new Patient({ name, urgency, appointmentTime, isEmergency, status, admissionDate, bed: bedId, treatments });
        await patient.save();

        res.status(201).send(patient);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const patient = await Patient.findByIdAndUpdate(id, updates, { new: true }).populate('bed');
        if (!patient) return res.status(404).send('Patient not found');

        res.status(200).send(patient);
    } catch (err) {
        res.status(500).send({ error: err.message });
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
