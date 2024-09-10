const Bed = require('../models/bed');
const Patient = require('../models/patient');

// Get all beds
exports.getAllBeds = async (req, res, next) => {
    try {
        const beds = await Bed.find().populate('patient');
        res.status(200).send(beds);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Get available beds
exports.getAvailableBeds = async (req, res, next) => {
    try {
        const beds = await Bed.find({ isOccupied: false });
        res.status(200).send(beds);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Add a new bed
exports.addBed = async (req, res, next) => {
    try {
        const { ward, unit } = req.body;

        const bed = new Bed({ ward, unit });
        await bed.save();

        res.status(201).send(bed);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Update bed status
exports.updateBedStatus = async (req, res, next) => {
    try {
        const { id, isOccupied, patientId } = req.body;

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
        next(err); // Pass error to global error handler
    }
};

