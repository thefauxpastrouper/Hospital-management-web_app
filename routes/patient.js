const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Add a new patient
router.post('/add', patientController.addPatient);


// Get all patients
router.get('/all', patientController.getAllPatients);



// Get patients by Name
router.get('/:name', patientController.getPatientByName);

// Get patients by id
router.get('/:id', patientController.getPatientById);

// Update patient information
router.patch('/:id', patientController.updatePatient);



// Delete a patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
