const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const UsersService = require('../dao/models/users.dao');
const serviceUser = new UsersService();

function validatorAdmin() {
  return async (req, res, next) => {
    const token = req.signedCookies.jwt;
    const decodedToken = await jwt.verify(token, config.jwtSecret);
    console.log("token:", decodedToken)
    const currentUser = await serviceUser.findOne(decodedToken.id)
    console.log("user:", currentUser)
    if( currentUser.role == "admin"){
      next();
    }else{
      console.log("No es Admin")
      res.redirect('/api/home');
    }
  }
}

function validatorPremiun() {
  return async (req, res, next) => {
    // const data = req[property]
    // const { error } = schema.validate(data, { abortEarly: false });
    // if (error) {
    //   next(boom.badRequest(error));
    // }
    const token = req.signedCookies.jwt;
    const decodedToken = await jwt.verify(token, config.jwtSecret);
    console.log("token:", decodedToken)
    const currentUser = await serviceUser.findOne(decodedToken.id)
    console.log("user:", currentUser)
    if( currentUser.role == "admin" || currentUser.role == "premiun"){
      next();
    }else{
      res.redirect('/api/home');
    }
  }
}


module.exports = { validatorAdmin, validatorPremiun };
