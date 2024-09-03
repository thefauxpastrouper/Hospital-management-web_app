const express = require('express');
const router = express.Router();
const {admitPatient, getAdmissionById, getAllAdmissions, updateAdmission, dischargePatient} = require('../controllers/admissionController');

// Get all admissions
router.get('/all', getAllAdmissions);

// Get a specific admission by ID
router.get('/:id', getAdmissionById);

// Admit a new patient
router.post('/admit', admitPatient);

// Update admission information (e.g., discharge patient)
router.patch('/:id', updateAdmission);

// Discharge a patient
router.delete('/:id', dischargePatient);

module.exports = router;
