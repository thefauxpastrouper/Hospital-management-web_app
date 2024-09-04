const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('./app');

const errorHandler = require('./middlewares/errorHandler');

// Middleware for parsing JSON bodies
app.use(express.json());

app.use('/queue', require('./routes/queue'));
app.use('/bed', require('./routes/bed'));
app.use('/admission', require('./routes/admission'));
app.use('/inventory', require('./routes/inventory'));
app.use('/patient', require('./routes/patient'));


// Use global error handler middleware
app.use(errorHandler);
// MongoDB Connection
mongoose.connect('mongodb+srv://admin1:8BhA4LVk4cWiymbb@database.vpysw.mongodb.net/', {
    
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
