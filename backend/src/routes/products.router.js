const express = require('express');
const router = express.Router();
const { getProducts, getPaginate, getNew, getMyProdutcs, getProduct, postProduct, putProduct, deleteProduct } = require('../controllers/products.controller')
const {validatorAdmin, validatorPremiun} = require('../middlewares/validatorRole.handler')

router.get('/',  validatorAdmin(), getProducts);
router.get('/paginate', validatorAdmin(), getPaginate);
router.get('/new', validatorPremiun(), getNew);
router.get('/myproducts', validatorPremiun(), getMyProdutcs)
router.get('/:pid', validatorPremiun(), getProduct);
router.post('/', validatorPremiun(), postProduct);
router.put('/:pid', validatorPremiun(), putProduct);
router.delete('/:pid', validatorPremiun(), deleteProduct)

module.exports = router
