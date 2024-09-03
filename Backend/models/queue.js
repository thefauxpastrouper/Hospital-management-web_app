const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    priority: { type: Number, required: true }, // Priority based on urgency or other criteria
    status: { type: String, default: 'waiting' }, // Status of the patient in the queue
    arrivalTime: { type: Date, default: Date.now },
}, { timestamps: true });

const Queue = mongoose.model('Queue', queueSchema);
module.exports = Queue;
