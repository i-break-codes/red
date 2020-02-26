const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  displayName: String,
  email: String,
  gender: String,
  providerId: String,
  created: {
    type: Date,
    default: Date.now
  },
  provider: String,
  photo: String,
  lastSignedInIp: String
});

module.exports = userModel;
