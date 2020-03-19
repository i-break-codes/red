const mongoose = require('mongoose');
const userSchema = require('@models/User');
const user = mongoose.model('User', userSchema);
const requestIp = require('request-ip');

class UserController {
  static create(req, accessToken, refreshToken, userProfileData, done) {
    let email = userProfileData.emails[0].value,
        provider = userProfileData.provider;

    user.findOne({
      providerId: userProfileData.id
    }, (err, data) => {
      if(!data) {
        let lastSignedInIp = requestIp.getClientIp(req),
            registerUser;

        switch(provider) {
          case 'google':
            registerUser = new user({
              firstName: userProfileData.name ? userProfileData.name.givenName : '',
              lastName: userProfileData.name ? userProfileData.name.familyName : '',
              email: email,
              gender: userProfileData.gender,
              providerId: userProfileData.id,
              displayName: userProfileData.displayName,
              provider: userProfileData.provider,
              isPlusUser: userProfileData.isPlusUser,
              photo: userProfileData.photos[0].value,
              lastSignedInIp
            });
          break;

          default:
            throw 'Something went wrong';
        }

        registerUser.save((err, user) => {
          return done(err, user);
        });
      } else {
        return done(err, data);
      }
    });
  }

  static deserialize(id, done) {
    user.findOne({
      providerId: id
    }, (err, data) => {
      if(err)
        throw err;

      done(null, data);
    });
  }

  static isUserAuthenticated(req, res, next) {
    if (req.user && req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }
}

module.exports = UserController;
