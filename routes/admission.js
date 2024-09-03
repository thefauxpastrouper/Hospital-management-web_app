const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');

// Get all admissions
router.get('/all', admissionController.getAllAdmissions);

// Get a specific admission by ID
router.get('/:id', admissionController.getAdmissionById);

// Admit a new patient
router.post('/admit', admissionController.admitPatient);

// Update admission information (e.g., discharge patient)
router.patch('/:id', admissionController.updateAdmission);

// Discharge a patient
router.delete('/:id', admissionController.dischargePatient);

module.exports = router;
