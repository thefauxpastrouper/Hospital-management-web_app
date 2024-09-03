// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log error stack trace to the console

    // Check if error is a ZodError (if using Zod for validation)
    if (err.name === 'ZodError') {
        return res.status(400).send({ errors: err.errors });
    }

    // Default error handling
    res.status(err.statusCode || 500).send({
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;
