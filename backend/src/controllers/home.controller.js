const ProductsService = require('../dao/models/products.dao');
const service = new ProductsService();
const UsersService = require('../dao/models/users.dao');
const serviceUser = new UsersService();
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const Users = require('../schemas/user.schema')

const getHome = async (req, res, next) => {
    try {
      const { limit } = req.query;
      const size = limit || 50;
      const products = await service.find(size);

      const token = req.signedCookies.jwt;
      const decodedToken = await jwt.verify(token,config.jwtSecret);
      const userName = decodedToken.name;
      const userLastName = decodedToken.lastname;
      const userEmail = decodedToken.email;
      console.log("token:", decodedToken)
      const cartUser = await serviceUser.findOne(decodedToken.id)
      const cartUserId = cartUser.cart
      console.log("cart:", cartUser)
      const user = {
        name: userName,
        lastname: userLastName,
        email: userEmail,
        cart: cartUserId
      };
      console.log(user)
      res.render('layouts/home', {
        user: user,
        products: products
      });
    } catch (error) {
      next(error)
    }

  }

  module.exports = { getHome }
