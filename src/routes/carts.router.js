const express = require('express');
const router = express.Router();
const { getCarts, getCart, getInvoice, postCart, putCart, putCartProduct, putCartPay, deleteCart, deleteCartProduct, postInvoice} = require('../controllers/carts.controller');
const {validatorAdmin} = require('../middlewares/validatorRole.handler');
const passport = require('passport');

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', validatorAdmin(), getCarts);
router.get('/:cid', getCart);
router.get('/:cid/invoice',  getInvoice);
router.post('/', postCart)
router.post('/invoice', postInvoice)
router.put('/:cid', putCart);
router.put('/:cid/product/:pid', putCartProduct);
router.put('/:cid/pay', putCartPay);
router.delete('/:cid', deleteCart);
router.delete('/:cid/product/:pid', deleteCartProduct);

module.exports = router



