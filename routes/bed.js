const express = require('express');
const router = express.Router();
const bedController = require('../controllers/bedController');

// Get all beds
router.get('/all', bedController.getAllBeds);

// Get available beds
router.get('/available', bedController.getAvailableBeds);

// Add a new bed
router.post('/add', bedController.addBed);

// Update bed status (e.g., occupied or freed up)
router.patch('/update', bedController.updateBedStatus);

module.exports = router;
