const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/loginCheck');

router.get('/logged', isLoggedIn, (req, res) => {
  res.render('logged', {
    name: req.user.displayName,
    picture: req.user.photos[0].value,
  });
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

router.get('/profile/settings', isLoggedIn, (req, res) => {
  res.render('profileSettings');
});

module.exports = router;
