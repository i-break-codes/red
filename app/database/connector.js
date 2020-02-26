const mongoose = require('mongoose');

class DatabaseController {
  constructor() {
    this.connect();
    this.status();
  }

  connect() {
    mongoose.connect(
      // TODO: Handle Credentials
      `mongodb://${config.db.mongo.host}:${config.db.mongo.port}/${config.db.mongo.name}`,
      {
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 30000,
        useUnifiedTopology: true
      }
    );
  }

  status() {
    mongoose.connection.on('connected', () => {
      console.log(`[Database] MongoDB Connected Successfully @Port: ${config.db.mongo.port}`);
    });

    mongoose.connection.on('error', err => {
      console.log(`[Database] MongoDB Error Occured. Error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log(`[Database] MongoDB Disconnected`);
    });
  }
}

module.exports = new DatabaseController();
