const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    status: { type: String, default: 'scheduled' },
});

const patientSchema = new mongoose.Schema({
    patientId: {type: String, required: true},
    name: { type: String, required: true },
    urgency: { type: Number, required: true },
    appointmentTime: { type: Date, required: true },
    isEmergency: { type: Boolean, default: false },
    status: { type: String, default: 'waiting' },
    admissionDate: { type: Date, default: null },
    bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed', default: null },
    treatments: [treatmentSchema],
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
