const UsersService = require('../dao/models/users.dao');
const service = new UsersService();
const CartsService = require('../dao/models/carts.dao');
const serviceCart = new CartsService();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const mongoose = require('mongoose');
const { object } = require('joi');
const { ObjectId } = mongoose.Types;
const Users = require('../schemas/user.schema')
const Carts= require('../schemas/cart.schema')


const getLogout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/layouts/home');
}

const getProfile = async (req, res) => {

  const token = req.signedCookies.jwt;
  const decodedToken = await jwt.verify(token,config.jwtSecret);
  const userName = decodedToken.name;
  const userLastName = decodedToken.lastname;
  const userEmail = decodedToken.email;

  const user = {
    name: userName,
    lastname: userLastName,
    email: userEmail
  };
  // const userPlainText = JSON.stringify(user);
  // console.log(userPlainText)
  res.render('layouts/profile', { user });
}

const postLogin = async (req, res) => {

  let email = req.body.email;
  let password = req.body.password;

  if(!email || !password){
      res.redirect('/api/sessions/login');
  }


  let user = await service.getUserByCreds(email, password);
  console.log(user)
  if (ObjectId.isValid(user._id)) {
    console.log(user._id)
    const createUser = await Carts.find({owner: user._id})
    if(!createUser || !createUser.some(item => item.state === false)){
      const newCart = await serviceCart.createCart(user._id)
      await Users.findByIdAndUpdate(user._id, { cart: newCart._id });
      console.log(newCart)
    }else{
      console.log("ya tiene carrito")
    }
    console.log(user)
  }else{
    console.log("no es correcto el id")
  }
  if(!user){
      res.redirect('/api/sessions/login');
  } else {
    let token = jwt.sign({
      id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email},
      config.jwtSecret, { expiresIn: '1h' });
    console.log(token)
    res.cookie("jwt", token, {
        signed:true,
        httpOnly:true,
        maxAge: 1000*60*60
    });

    res.redirect('/api/home');
  }
}

const postRegister = async (req, res) => {

  let first_name = req.body.firstName;
  let last_name = req.body.lastName;
  let email = req.body.email;
  let birthdate = req.body.birthdate;
  let password = req.body.password;

  if(!first_name || !last_name || !email || !birthdate || !password){
      res.redirect('/api/sessions/register');
  }

  let emailUsed = await service.findByEmail(email)

  if(emailUsed){
      res.redirect('/api/sessions/register');
  } else {
      let passwordBcrypt = bcrypt.hashSync(password,10)
      await service.createUser({
        name: first_name,
        lastname: last_name,
        email: email,
        birthdate: birthdate,
        password: passwordBcrypt
      });
      res.redirect('/api/sessions/login');
  }
}

module.exports = { getLogout, getProfile, postLogin, postRegister }