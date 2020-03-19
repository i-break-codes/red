const express = require('express');
const router = express.Router();
const authMiddleware = require('@middleware/Authentication');

router.get('/', authMiddleware.isAuthenticated, (req, res) => {
  res.render('pages/dashboard', {
    user: req.user
  });
});

module.exports = router;
