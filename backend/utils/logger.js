// utils/logger.js

const chalk = require('chalk');

// Log levels
const LOG_LEVELS = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

// Helper function to format the logs
const logMessage = (level, message) => {
    const timestamp = new Date().toISOString();
    switch (level) {
        case LOG_LEVELS.INFO:
            console.log(chalk.blue(`[INFO] [${timestamp}] ${message}`));
            break;
        case LOG_LEVELS.WARN:
            console.log(chalk.yellow(`[WARN] [${timestamp}] ${message}`));
            break;
        case LOG_LEVELS.ERROR:
            console.log(chalk.red(`[ERROR] [${timestamp}] ${message}`));
            break;
        default:
            console.log(chalk.white(`[LOG] [${timestamp}] ${message}`));
            break;
    }
};

// Expose the logger functionality
module.exports = {
    info: (msg) => logMessage(LOG_LEVELS.INFO, msg),
    warn: (msg) => logMessage(LOG_LEVELS.WARN, msg),
    error: (msg) => logMessage(LOG_LEVELS.ERROR, msg),
};
