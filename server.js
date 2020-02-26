//* Register Modules
require('module-alias/register')
require('@config/initializer');

const app = require('express')();
const http = require('http').Server(app);
const logger = require('@utils/Logger');

//* Load All Middleware
require('@middleware/initializer')(app);

//* Connect to Database
require('@database/connector');

http.listen(config.env.port, () => {
  logger.log('runtime', `Server Started @Port: ${config.env.port}`, 'blue');
});
