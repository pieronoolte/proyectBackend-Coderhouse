const express = require('express');
const router = express.Router();
const { getProducts, getRealTime, getChat} = require('../controllers/realTime.controller')

// const getProducts = async () => {
//   return await service.find(5);
// };

router.get('/', getRealTime);
router.get('/chat', getChat);

module.exports = {router, getProducts}
