const dotEnv = require('dotenv');
const db = require('@config/db.config');
const auth = require('@config/auth.keys');

class Initializer {
  constructor() {
    //! Global Configuration
    global.config = Object.assign(
      {},
      { "env": dotEnv.config().parsed },
      { db }
    );

    global.keys = Object.assign(
      {},
      { auth }
    )
  }
}

module.exports = new Initializer();
