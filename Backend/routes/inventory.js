const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/all', inventoryController.getAllItems);
router.post('/add', inventoryController.addItem);
router.patch('/:id', inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);

module.exports = router;
