const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema(
    {
      name: String,
      age: Number,
      mobileNo: Number,
      email: {
        type:String,
        default:NaN
      },
      address: String,
      disease: String,
      fees: Number,
    },
    {
      timestamps: true,
    }
  );
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
