import * as winston from 'winston'

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    exitOnError: false,
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: './logs/combined.log',
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
})

export default logger
