const Admission = require('../models/admission');
const Patient = require('../models/patient');
const Bed = require('../models/bed');

exports.admitPatient = async (req, res) => {
    const { patientId, bedId } = req.body;
    if (!patientId || !bedId) {
        res.status(400).send({ message: "Content can not be empty!" });}
    
        const patient = await Patient.findById(patientId);
        
        
        if (patient) {
            return res.status(404).send('Patient not found');
        }

        // Validate if bed exists
        const bed = await Bed.findById(bedId);
        if (bed.isOccupied) {
            return res.status(400).send('Bed not found');
        }
      
        // Create admission record
        const admission = new Admission({
            patient: patientId,
            bed: bedId,
        });
        await admission.save();

        // Update bed status
        bed.isOccupied = true;
        bed.patient = patientId;
        await bed.save();

        // Update patient status
        patient.status = 'admitted';
        await patient.save();

        res.status(201).send(admission);
    
};

exports.getAllAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().populate('patient').populate('bed');
        res.status(200).send(admissions);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getAdmissionById = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id).populate('patient').populate('bed');
        if (!admission) return res.status(404).send('Admission not found');

        res.status(200).send(admission);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};




exports.updateAdmission = async (req, res) => {
    try {
        const { id } = req.params;
        const { dischargeDate, status } = req.body;

        const admission = await Admission.findById(id);
        if (!admission) return res.status(404).send('Admission not found');

        // Update admission record
        admission.dischargeDate = dischargeDate || admission.dischargeDate;
        admission.status = status || admission.status;
        await admission.save();

        // Update bed status if discharged
        if (status === 'discharged') {
            const bed = await Bed.findById(admission.bed);
            if (bed) {
                bed.isOccupied = false;
                bed.patient = null;
                await bed.save();
            }

            // Update patient status
            const patient = await Patient.findById(admission.patient);
            if (patient) {
                patient.status = 'discharged';
                await patient.save();
            }
        }

        res.status(200).send(admission);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.dischargePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const admission = await Admission.findById(id);
        if (!admission) return res.status(404).send('Admission not found');

        // Discharge patient
        admission.status = 'discharged';
        admission.dischargeDate = new Date();
        await admission.save();

        // Update bed status
        const bed = await Bed.findById(admission.bed);
        if (bed) {
            bed.isOccupied = false;
            bed.patient = null;
            await bed.save();
        }

        // Update patient status
        const patient = await Patient.findById(admission.patient);
        if (patient) {
            patient.status = 'discharged';
            await patient.save();
        }

        res.status(200).send({ message: 'Patient discharged successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

