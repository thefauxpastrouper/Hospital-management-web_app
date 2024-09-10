const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// Get all patients in the queue
router.get('/all', queueController.getAllQueues);

// Add a patient to the queue
router.post('/add', queueController.addToQueue);

// Update the status of a patient in the queue (e.g., moved to "seen")
router.patch('/update', queueController.updateQueue);

// Remove a patient from the queue
router.delete('/delete', queueController.removeFromQueue);

module.exports = router;
