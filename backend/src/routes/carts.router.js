const express = require('express');

const router = express.Router();
const { getCarts, getCart, getInvoice, postCart, putCart, putCartProduct, putCartPay, deleteCart, deleteCartProduct} = require('../controllers/carts.controller');


router.get('/', getCarts);
router.get('/:cid', getCart);
router.get('/:cid/invoice', getInvoice);
router.post('/', postCart)
router.put('/:cid', putCart);
router.put('/:cid/product/:pid', putCartProduct);
router.put('/:cid/pay', putCartPay);
router.delete('/:cid', deleteCart);
router.delete('/:cid/product/:pid', deleteCartProduct);

module.exports = router



