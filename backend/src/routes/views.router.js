const express = require('express');
// const UsersService = require('../dao/models/user.dao');
const router = express.Router();
// const service = new UsersService();


router.get('/', (req, res) => {
  res.redirect('/api/home');
});

router.get('/api/home', (req, res) => {

  // if(req.signedCookies.jwt){
  //     res.redirect('/api/sessions/profile');
  // } else {
  //     res.render('layouts/home');
  // }
  req.signedCookies.jwt ? res.redirect('/api/sessions/profile') : res.render('layouts/home');
});

router.get('/api/sessions/register', (req, res) => {
  res.render('layouts/register');
});

router.get('/api/sessions/login', (req, res) => {

  // if(req.signedCookies.jwt){
  //     res.redirect('/api/sessions/profile');
  // } else {
  //     res.render('layouts/login');
  // }
  req.signedCookies.jwt ? res.redirect('/api/sessions/profile') : res.render('layouts/login');
});


// router.get('/api/sessions/profile', async (req, res) => {

//   if(req.signedCookies.jwt){

//       let user = await service.getUserByID(req.session.user);
//       res.render('layouts/profile', {user});

//   } else {
//       res.redirect('/api/sessions/login');
//   }

// })

module.exports = router
