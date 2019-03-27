"use strict";

let winston = require("winston");
require("winston-daily-rotate-file");
module.exports = app => {
    let logger;
    logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
          //
          // - Write to all logs with level `info` and below to `combined.log` 
          // - Write all logs error (and below) to `error.log`.
          //
          new winston.transports.Console(),
          new winston.transports.File({ filename: 'error.log', level: 'error' }),
          new winston.transports.File({ filename: 'combined.log' })
        ]
      });

    return logger;
};
