/**
* @swagger
* paths:
*   "/realTimeProducts":
*     get:
*       tags:
*       - RealTime
*       summary: Get Real handlebars
*       description: Get Real handlebars
*       operationId: getRealHandlebars
*       parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
*   "/api/users/91791938-7446-4933-90e4-5d9558d21123":
*     get:
*       tags:
*       - Views
*       summary: Get handlebars
*       description: Get handlebars
*       operationId: getHandlebars
*       parameters:
*       - name: isActive
*         in: query
*         schema:
*           type: string
*           example: 'true'
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
*   "/api/users":
*     get:
*       tags:
*       - Users
*       summary: Get users
*       description: Get users
*       operationId: getUsers
*       parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
*   "/api/users/6653ca9323cdd30234c84599":
*     get:
*       tags:
*       - Users
*       summary: Get users cart
*       description: Get users cart
*       operationId: getUsersCart
*       parameters:
*       - name: isActive
*         in: query
*         schema:
*           type: string
*           example: 'true'
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
*   "/api/products/":
*     get:
*       tags:
*       - Products
*       summary: Get products
*       description: Get products
*       operationId: getProducts
*       parameters:
*       - name: ''
*         in: query
*         schema:
*           type: string
*           example: ''
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
*     post:
*       tags:
*       - Products
*       summary: Post product
*       description: Post product
*       operationId: postProduct
*       parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       requestBody:
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 category:
*                   type: string
*                   example: Create1
*                 code:
*                   type: number
*                   example: 33333
*                 description:
*                   type: string
*                   example: Create5
*                 price:
*                   type: number
*                   example: 33333
*                 status:
*                   type: boolean
*                   example: true
*                 stock:
*                   type: number
*                   example: 80
*                 thumbnails:
*                   type: string
*                   example: https://loremflickr.com/640/480?lock=1826723643523072
*                 title:
*                   type: string
*                   example: Create 5
*             examples:
*               Post product:
*                 value:
*                   category: Create1
*                   code: 33333
*                   description: Create5
*                   price: 33333
*                   status: true
*                   stock: 80
*                   thumbnails: https://loremflickr.com/640/480?lock=1826723643523072
*                   title: Create 5
*       responses:
*         '200':
*           description: ''
*   "/api/products/65cd05990a44bce4472d8a0a":
*     delete:
*       tags:
*       - Products
*       summary: Delete product
*       description: Delete product
*       operationId: deleteProduct
*       parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*       responses:
*         '200':
*           description: ''
* "/api/products/65cd05990a44bce4472d8a0c":
*   patch:
*     tags:
*       - Products
*     summary: Patch product
*     description: Patch product
*     operationId: patchProduct
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               category:
*                 type: string
*                 example: Create2
*               description:
*                 type: string
*                 example: Create3
*               title:
*                 type: string
*                 example: Create 5
*           examples:
*             Patch product:
*               value:
*                 category: Create2
*                 description: Create3
*                 title: Create 5
*     responses:
*       '200':
*         description: ''
* "/api/products/6653cb1023cdd30234c845c5":
*   get:
*     tags:
*       - Products
*     summary: Get product id
*     description: Get product id
*     operationId: getProductId
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/products/paginate":
*   get:
*     tags:
*       - Products
*     summary: Get products paginate
*     description: Get products paginate
*     operationId: getProductsPaginate
*     parameters:
*       - name: ''
*         in: query
*         schema:
*           type: string
*           example: ''
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/home/":
*   get:
*     tags:
*       - Home
*     summary: Get home handlebars
*     description: Get home handlebars
*     operationId: getHomeHandlebars
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/carts/65dd21d33fc06eef5c8de6ac/product/65cee59b49220574da7b6064":
*   delete:
*     tags:
*       - Carts
*     summary: Delete Cart Product
*     description: Delete Cart Product
*     operationId: deleteCartProduct
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/carts/65dc31fb3aa3043919e24bd9":
*   delete:
*     tags:
*       - Carts
*     summary: Delete Cart
*     description: Delete Cart
*     operationId: deleteCart
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/carts/6653cc4a23cdd30234c845d3":
*   get:
*     tags:
*       - Carts
*     summary: Get Cart id
*     description: Get Cart id
*     operationId: getCartId
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
*   put:
*     tags:
*       - Carts
*     summary: Put Cart
*     description: Put Cart
*     operationId: putCart
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/carts/65cd947bcdd5a51aac9460ef/product/65cd94cdd5a51aac9460ea":
*   put:
*     tags:
*       - Carts
*     summary: Put Cart Product
*     description: Put Cart Product
*     operationId: putCartProduct
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/carts/6653cc4a23cdd30234c845d3":
*   get:
*     tags:
*       - Carts
*     summary: Get Carts
*     description: Get Carts
*     operationId: getCarts
*     parameters:
*       - name: ''
*         in: query
*         schema:
*           type: string
*           example: ''
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
*   post:
*     tags:
*       - Carts
*     summary: Post Cart
*     description: Post Cart
*     operationId: postCart
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.5.1
*     responses:
*       '200':
*         description: ''
* "/api/sessions/register":
*   get:
*     tags:
*       - Sessions
*     summary: Get Login
*     description: Get Login
*     operationId: getLogin
*     parameters:
*       - name: user-agent
*         in: header
*         schema:
*           type: string
*           example: insomnia/8.6.1
*     responses:
*       '200':
*         description: ''
* tags:
* - name: RealTime
* - name: Views
* - name: Users
* - name: Products
* - name: Home
* - name: Carts
* - name: Sessions
*/
