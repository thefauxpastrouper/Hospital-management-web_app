const Inventory = require('../models/inventory');

// Get all inventory items
exports.getAllItems = async (req, res, next) => {
    try {
        const items = await Inventory.find();
        res.status(200).send(items);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Add a new item to inventory
exports.addItem = async (req, res, next) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Update an existing inventory item
exports.updateItem = async (req, res, next) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        if (req.body.quantity) item.quantity = req.body.quantity;
        if (req.body.issued) item.issued = req.body.issued;

        await item.save();
        res.status(200).send(item);
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};

// Delete an inventory item
exports.deleteItem = async (req, res, next) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (err) {
        next(err); // Pass error to global error handler
    }
};
