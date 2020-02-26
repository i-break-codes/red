const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const userController = require('@controllers/User');

class Authentication {
  constructor() {
    this.authenticate();
  }

  authenticate() {
    passport.serializeUser((user, done) => {
      done(null, user.providerId);
    });

    passport.deserializeUser((id, done) => {
      userController.deserialize(id, done);
    });

    passport.use(new googleStrategy(
      {
        clientID: keys.auth.google.clientId,
        clientSecret: keys.auth.google.clientSecret,
        callbackURL: (config.env.type === 'development') ? `http://localhost:${config.env.port}/auth/google/callback` : 'PROD_URL_GOES_HERE',
        passReqToCallback: true
      }, userController.create
    ));
  }
}

module.exports = new Authentication();
