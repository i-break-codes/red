const logger = require('@utils/Logger');

class GlobalExceptionHandler {
  static exceptionHandlingMiddleware(err, req, res, next) {
    if (!err)
      return next();

    logger.log('error', err.stack);

    res.status(500).send({
      message: "Something went wrong"
    });
  }

  static catchUncaughtExceptions() {
    process.on('uncaughtException', err => {
      logger.log('error', err.stack);
      process.exit(1);
    });
  }
}

module.exports = GlobalExceptionHandler;
