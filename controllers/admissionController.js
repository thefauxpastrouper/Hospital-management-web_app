const Admission = require('../models/admission');
const Patient = require('../models/patient');
const Bed = require('../models/bed');

exports.admitPatient = async (req, res, next) => {
    try {
        const { patientId, bedId } = req.body;
        if (!patientId || !bedId) {
            throw { statusCode: 400, message: "Content cannot be empty!" };
        }

        const patient = await Patient.findById(patientId);
        if (!patient) {
            throw { statusCode: 404, message: 'Patient not found' };
        }

        const bed = await Bed.findById(bedId);
        if (!bed || bed.isOccupied) {
            throw { statusCode: 400, message: 'Bed not available' };
        }

        const admission = new Admission({ patient: patientId, bed: bedId });
        await admission.save();

        bed.isOccupied = true;
        bed.patient = patientId;
        await bed.save();

        patient.status = 'admitted';
        await patient.save();

        res.status(201).send(admission);
    } catch (err) {
        next(err); // Pass errors to the global error handler
    }
};

exports.getAllAdmissions = async (req, res, next) => {
    try {
        const admissions = await Admission.find().populate('patient').populate('bed');
        res.status(200).send(admissions);
    } catch (err) {
        next(err);
    }
};

exports.getAdmissionById = async (req, res, next) => {
    try {
        const admission = await Admission.findById(req.params.id).populate('patient').populate('bed');
        if (!admission) return res.status(404).send('Admission not found');

        res.status(200).send(admission);
    } catch (err) {
        next(err);
    }
};

exports.updateAdmission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { dischargeDate, status } = req.body;

        const admission = await Admission.findById(id);
        if (!admission) return res.status(404).send('Admission not found');

        admission.dischargeDate = dischargeDate || admission.dischargeDate;
        admission.status = status || admission.status;
        await admission.save();

        if (status === 'discharged') {
            const bed = await Bed.findById(admission.bed);
            if (bed) {
                bed.isOccupied = false;
                bed.patient = null;
                await bed.save();
            }

            const patient = await Patient.findById(admission.patient);
            if (patient) {
                patient.status = 'discharged';
                await patient.save();
            }
        }

        res.status(200).send(admission);
    } catch (err) {
        next(err);
    }
};

exports.dischargePatient = async (req, res, next) => {
    try {
        const { id } = req.params;
        const admission = await Admission.findById(id);
        if (!admission) return res.status(404).send('Admission not found');

        admission.status = 'discharged';
        admission.dischargeDate = new Date();
        await admission.save();

        const bed = await Bed.findById(admission.bed);
        if (bed) {
            bed.isOccupied = false;
            bed.patient = null;
            await bed.save();
        }

        const patient = await Patient.findById(admission.patient);
        if (patient) {
            patient.status = 'discharged';
            await patient.save();
        }

        res.status(200).send({ message: 'Patient discharged successfully' });
    } catch (err) {
        next(err);
    }
};

