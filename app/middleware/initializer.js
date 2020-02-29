const morgan = require('morgan');
const logger = require('@utils/Logger');
const globalErrorHandler = require('@middleware/ExceptionHandler');
const passport = require('passport');
const redis = require('redis');
const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);
const redisClient = redis.createClient();
const cookieParser = require('cookie-parser');
const authRoutes = require('@routes/Authentication');
const authenticationController = require('@middleware/Authentication');
const cors = require('cors');

module.exports = app => {
  //* Enable Cross-Origin
  app.use(cors());

  //* Set EJS View Engine
  app.set("view engine", "ejs");
  app.set('views', 'app/views');

  //* Stream HTTP requests to Info Logs
  app.use(morgan('combined', {
    stream: logger.winstonLogger.stream
  }));

  app.use(cookieParser());

  //* Store Session
  app.use(
    expressSession({
      secret: 'R4ND0M_JUNK',
      saveUninitialized: false,
      resave: false,
      store: new redisStore({
        host: config.db.redis.host,
        client: redisClient,
        port: config.db.redis.port,
        ttl: config.db.redis.ttl
      })
    })
  );

  redisClient.on('connect', () => {
    console.log(
      `[Database] Redis Connected Successfully @Port: ${config.db.redis.port}`
    );
  });

  app.use(passport.initialize());
  app.use(passport.session());

  //* Load Base Routes
  app.use('/', authRoutes);

  //! Exception Handler Middleware
  app.use(globalErrorHandler.exceptionHandlingMiddleware);

  //! Catch unCaughtexception
  globalErrorHandler.catchUncaughtExceptions();
}
