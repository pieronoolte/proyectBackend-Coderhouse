const express = require('express');
const productsRouter = require('./products.router');
const cartsRouter = require('./carts.router');
const usersRouter = require('./users.router');
const homeRouter = require('./home.router');
const sessionsRouter =require('./sessions.router')
const viewsRouter = require('./views.router')

function routerApi(app){


  const router = express.Router();
  app.use('/api/', router)
  router.use('/products', productsRouter);
  router.use('/carts',cartsRouter);
  router.use('/users',usersRouter);
  router.use('/home',homeRouter);
  router.use('/sessions', sessionsRouter)
  app.use('/', viewsRouter)

}

module.exports = routerApi


