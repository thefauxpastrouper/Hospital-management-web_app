const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
    ward: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        default: null
    }
}, { 
    timestamps: true 
});

const Bed = mongoose.model('Bed', bedSchema);
module.exports = Bed;
