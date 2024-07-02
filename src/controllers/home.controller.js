const ProductsService = require('../dao/models/products.dao');
const service = new ProductsService();
const UsersService = require('../dao/models/users.dao');
const serviceUser = new UsersService();
const jwt = require('jsonwebtoken');
const { config } = require('../../config');


const getHome = async (req, res) => {
  const { limit } = req.query;
  const size = limit || 50;
  let products;
  try {
    let user;
    const token = req.signedCookies.jwt;
    const decodedToken = await jwt.verify(token, config.jwtSecret);
    const userName = decodedToken.name;
    const userLastName = decodedToken.lastname;
    const userEmail = decodedToken.email;

    products = await service.find(size);
    const cartUser = await serviceUser.findOne(decodedToken.id)
    const cartUserId = cartUser.cart
    user = {
      name: userName,
      lastname: userLastName,
      email: userEmail,
      cart: cartUserId
    };
    res.render('layouts/home', {
      user: user,
      products: products
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError' && error.message === 'jwt must be provided') {
      // Redirigir si no se proporciona un token
      products = await service.find(size);
      res.render('layouts/home', {
        products: products
      }); // Redirige al login o muestra una página de error
    } else {
      // Manejar otros errores de JWT
      return res.status(401).json({ message: error.message });
    }
  }

}

module.exports = { getHome }
