const Queue = require('../models/queue');
const Patient = require('../models/patient');

// Get all queues
exports.getAllQueues = async (req, res, next) => {
    try {
        const queues = await Queue.find().populate('patient');
        res.status(200).send(queues);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Add a patient to the queue
exports.addToQueue = async (req, res, next) => {
    try {
        const { patientId, priority } = req.body;

        // Validate if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).send('Patient not found');

        const queue = new Queue({ patient: patientId, priority });
        await queue.save();

        res.status(201).send(queue);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Update a queue entry
exports.updateQueue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const queue = await Queue.findById(id);
        if (!queue) return res.status(404).send('Queue entry not found');

        queue.status = status;
        await queue.save();

        res.status(200).send(queue);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Remove a patient from the queue
exports.removeFromQueue = async (req, res, next) => {
    try {
        const { id } = req.params;
        const queue = await Queue.findByIdAndDelete(id);
        if (!queue) return res.status(404).send('Queue entry not found');

        res.status(200).send({ message: 'Patient removed from queue' });
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};
