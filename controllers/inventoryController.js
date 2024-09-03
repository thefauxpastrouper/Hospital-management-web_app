const Inventory = require('../models/inventory');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Inventory.find();
        res.status(200).send(items);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        if (req.body.quantity) item.quantity = req.body.quantity;
        if (req.body.issued) item.issued = req.body.issued;

        await item.save();
        res.status(200).send(item);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};
