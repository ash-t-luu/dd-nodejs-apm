const { createLogger, format, transports } = require('winston');
const path = require('path');
const appRoot = path.resolve(__dirname);

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new transports.File({ filename: `${appRoot}/logs/application.log`}),
    ],
});

module.exports = logger;