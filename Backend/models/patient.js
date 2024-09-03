const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    status: { type: String, default: 'scheduled' },
});

const patientSchema = new mongoose.Schema({
   
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
