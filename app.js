const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const queueRoutes = require('./routes/queue');
const bedRoutes = require('./routes/bed');
const admissionRoutes = require('./routes/admission');
const inventoryRoutes = require('./routes/inventory');
const patientRoutes = require('./routes/patient');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/queue', queueRoutes);
app.use('/bed', bedRoutes);
app.use('/admission', admissionRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/patient', patientRoutes);

module.exports = app;
