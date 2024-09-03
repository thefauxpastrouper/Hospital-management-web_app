const Bed = require('../models/bed');
const Patient = require('../models/patient');

exports.getAllBeds = async (req, res) => {
    try {
        const beds = await Bed.find().populate('patient');
        res.status(200).send(beds);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.getAvailableBeds = async (req, res) => {
    try {
        const beds = await Bed.find({ isOccupied: false });
        res.status(200).send(beds);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.addBed = async (req, res) => {
    try {
        const { ward, unit } = req.body;

        const bed = new Bed({ ward, unit });
        await bed.save();

        res.status(201).send(bed);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updateBedStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isOccupied, patientId } = req.body;

        const bed = await Bed.findById(id);
        if (!bed) return res.status(404).send('Bed not found');

        bed.isOccupied = isOccupied;
        bed.patient = isOccupied ? patientId : null;

        await bed.save();

        // Optionally update patient record
        if (isOccupied && patientId) {
            await Patient.findByIdAndUpdate(patientId, { $set: { status: 'admitted' } });
        }

        res.status(200).send(bed);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
