// src/common/utils/logger.js

const { createLogger, format, transports } = require('winston');
const path = require('path');

// Define the log format
const logFormat = format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Adds timestamp
    format.errors({ stack: true }), // Captures stack traces
    format.splat(), // Allows string interpolation
    format.json() // Logs in JSON format
);

// Create the logger instance
const logger = createLogger({
    level: 'info', // Log levels: error, warn, info, http, verbose, debug, silly
    format: logFormat,
    transports: [
        // Log errors to error.log
        new transports.File({ filename: path.join(__dirname, '../../logs/error.log'), level: 'error' }),
        // Log all levels to combined.log
        new transports.File({ filename: path.join(__dirname, '../../logs/combined.log') }),
    ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(), // Adds color to the logs
            format.simple() // Simple format without JSON
        )
    }));
}

module.exports = logger;
