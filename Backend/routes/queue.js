const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

// Get all patients in the queue
router.get('/all', queueController.getAllQueues);

// Add a patient to the queue
router.post('/add', queueController.addToQueue);

// Update the status of a patient in the queue (e.g., moved to "seen")
router.patch('/:id', queueController.updateQueue);

// Remove a patient from the queue
router.delete('/:id', queueController.removeFromQueue);

module.exports = router;
