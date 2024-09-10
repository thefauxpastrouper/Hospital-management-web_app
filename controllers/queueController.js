const Queue = require('../models/queue');
const Patient = require('../models/patient');

// Get all queues
exports.getAllQueues = async (req, res) => {
    try {
        const queues = await Queue.find().populate('patient');

        // If no queues are found, send a 404 response
        if (!queues || queues.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No queues found'
            });
        }

        const filteredQueues = queues.map(queue => ({
            name: queue.patient.name,
            priority: queue.priority,
            status: queue.status,
            fees: queue.fees
        }));

        // Send a successful response
        res.status(200).json({
            success: true,
            data: {queue : filteredQueues}
        });
    } catch (err) {
        // Handle the error and send a 500 internal server error response
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


// Add a patient to the queue
exports.addToQueue = async (req, res) => {
    try {
        const { patientId, priority } = req.body;

        // Check if patientId is provided
        if (!patientId) {
            return res.status(400).json({
                success: false,
                message: 'Patient ID is required'
            });
        }

        // Validate if patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) {
            return res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }

        // Create a new queue entry with the patient and priority
        const queue = new Queue({
            patient: patientId,
            priority: priority || 'normal'  // Default priority if not provided
        });

        // Save the queue entry
        await queue.save();

        // Return a success response with the queue details
        return res.status(201).json({
            success: true,
            message: 'Patient added to the queue',
            data: queue
        });
    } catch (err) {
        // Handle the error and send a 500 internal server error response
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: err.message
        });
    }
};


exports.updateQueue = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        if (!id || !status) {
            return res.status(400).json({
                message: "id or status is not provided"
            });
        }

        const queue = await Queue.findById(id);

        if (!queue) {
            return res.status(404).json({ message: "NOT FOUND" });
        }

        // Update the status based on the provided value
        queue.status = status;

        await queue.save();

        res.status(200).json({
            message: "SUCCESS",
            data: queue
        });
    } catch (err) {
        res.status(500).json({
            message: "Something wrong has occurred. Check credentials",
            error: err.message
        });
    }
};

// Remove a patient from the queue
exports.removeFromQueue = async (req, res, next) => {
    try {
        const { id } = req.body;
        const queue = await Queue.findByIdAndDelete(id);
        if (!queue) return res.status(404).send('Queue entry not found');

        res.status(200).send({ message: 'Patient removed from queue' });
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};
