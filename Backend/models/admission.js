// importing mongoose library
const mongoose = require('mongoose');

const admissionSchema = new mongoose.Schema({
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    bed: { type: mongoose.Schema.Types.ObjectId, ref: 'Bed', required: true },
    admissionDate: { type: Date, default: Date.now },
    dischargeDate: { type: Date, default: null },
    status: { type: String, default: 'admitted' },
}, { timestamps: true });

const Admission = mongoose.model('Admission', admissionSchema);

module.exports = Admission;
