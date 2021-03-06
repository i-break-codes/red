const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
  res.render('pages/login');
});

router.get('/auth/google', passport.authenticate('google',
  {
    scope: [
      'email',
      'profile'
    ]
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: `/dashboard`, // Success Redirect URL Goes Here
    failureRedirect: `/` // Failure Redirect URL Goes Here
  })
);

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err)
      throw err;

    res.redirect('/');
  });
});

module.exports = router;
