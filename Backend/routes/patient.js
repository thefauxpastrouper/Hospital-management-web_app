const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Get all patients
router.get('/all', patientController.getAllPatients);

// Get a specific patient by ID
router.get('/:id', patientController.getPatientById);

// Add a new patient
router.post('/add', patientController.addPatient);

// Update patient information
router.patch('/:id', patientController.updatePatient);

// Delete a patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
