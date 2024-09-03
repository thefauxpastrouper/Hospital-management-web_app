const Queue = require('../models/queue');
const Patient = require('../models/patient');

exports.getAllQueues = async (req, res) => {
    try {
        const queues = await Queue.find().populate('patient');
        res.status(200).send(queues);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.addToQueue = async (req, res) => {
    try {
        const { patientId, priority } = req.body;

        // Validate if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).send('Patient not found');

        const queue = new Queue({ patient: patientId, priority });
        await queue.save();

        res.status(201).send(queue);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updateQueue = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const queue = await Queue.findById(id);
        if (!queue) return res.status(404).send('Queue entry not found');

        queue.status = status;
        await queue.save();

        res.status(200).send(queue);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.removeFromQueue = async (req, res) => {
    try {
        const { id } = req.params;
        const queue = await Queue.findByIdAndDelete(id);
        if (!queue) return res.status(404).send('Queue entry not found');

        res.status(200).send({ message: 'Patient removed from queue' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
