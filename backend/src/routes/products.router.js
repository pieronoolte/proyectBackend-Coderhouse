const express = require('express');
const router = express.Router();
const { getProducts, getPaginate, getNew, getMyProdutcs,getProduct, postProduct, patchProduct, deleteProduct } = require('../controllers/products.controller')


router.get('/', getProducts);
router.get('/paginate', getPaginate);
router.get('/new', getNew);
router.get('/myproducts', getMyProdutcs)
router.get('/:pid', getProduct);
router.post('/', postProduct);
router.patch('/:pid', patchProduct);
router.delete('/:pid', deleteProduct)

module.exports = router


// /*
// JSON DE PRUEBA PARA INGRESAR EN POST
// {
// "title": "Create 1",
// "description": "Create1",
// "code": 33333,
// "price": 33333,
// "status": true,
// "stock": 80,
// "category": "Create1",
// "thumbnails":"https://loremflickr.com/640/480?lock=1826723643523072"
// }
// */
