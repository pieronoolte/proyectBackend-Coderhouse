const express = require('express');

const router = express.Router();
const { getCarts, getCart, postCart, putCart, putCartProduct, deleteCart, deleteCartProduct} = require('../controllers/carts.controller');


router.get('/', getCarts);
router.get('/:cid', getCart);
router.post('/', postCart)
router.put('/:cid', putCart);
router.put('/:cid/product/:pid', putCartProduct);
router.delete('/:cid', deleteCart);
router.delete('/:cid/product/:pid', deleteCartProduct);

module.exports = router



