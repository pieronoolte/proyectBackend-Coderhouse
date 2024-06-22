const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api/home/check');
});

router.get('/api/home/check', (req, res) => {

  if (req.signedCookies.jwt) {
    res.redirect('/api/home');
  } else {
    res.redirect('/api/sessions/register');
  }
});

router.get('/api/sessions/register', (req, res) => {
  res.render('layouts/register');
});

router.get('/api/sessions/login', (req, res) => {
  req.signedCookies.jwt ? res.redirect('/api/sessions/home') : res.render('layouts/login');
});


module.exports = router
