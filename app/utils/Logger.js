const winston = require('winston');
const chalk = require('chalk');
const _ = require('lodash');

class Logger {
  constructor() {
    this.winstonLogger = new winston.createLogger({
      format: winston.format.json(),
      json: true,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 10,
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: './logs/error/error.log'
        }),
        new winston.transports.File({
          level: 'info',
          filename: './logs/info/info.log'
        }),
        new winston.transports.File({
          level: 'alert',
          filename: './logs/alert/alert.log'
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false
        })
      ],
      exitOnError: false
    });

    this.winstonLogger.stream = {
      write: message => {
        this.winstonLogger.info(message);
      }
    }
  }

  log(level, message, formatter) {
    let loggerInstance = this.winstonLogger;

    switch(level) {
      case 'runtime':
        console.log(formatter ? _.get(chalk, formatter)(message) : message);
        break;
      case 'error':
        loggerInstance.error(message);
        break;
      case 'alert':
        loggerInstance.alert(message);
        break;
      case 'info':
        loggerInstance.info(message);
        break;
      default:
        loggerInstance.log({
          level,
          message
        });
    }
  }
}

module.exports = new Logger();
