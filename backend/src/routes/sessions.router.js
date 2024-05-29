const express = require('express');
const passport = require('passport');
const router = express.Router();
const { getLogout, getProfile, postLogin, postRegister } = require('../controllers/sessions.controller')


router.get('/logout', getLogout);
router.get('/profile', passport.authenticate('jwt', { session: false }), getProfile);
router.post('/login', postLogin)
router.post('/register', postRegister)


module.exports = router
