const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('./app');

const errorHandler = require('./middlewares/errorHandler');

// Middleware for parsing JSON bodies
app.use(express.json());

// Define your routes
// e.g., app.use('/beds', require('./routes/beds'));

// Use global error handler middleware
app.use(errorHandler);
// MongoDB Connection
mongoose.connect('mongodb+srv://admin:bY5RKYwB3ZwJS7rr@cluster0.vpysw.mongodb.net/', {
    
}).then(() =>{
  const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log("MongoDB connected lets do it...");
} )
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Start the server

