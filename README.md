
# Project E comerce Coder house

A continuación se presenta el proyecto final de Coder house.

## INSTALACIÓN

Instrucciones sobre cómo instalar y configurar el proyecto.

```javascript
git clone https://github.com/pieronoolte/proyectBackend-Coderhouse.git
cd tu_repositorio/backend
npm install
```

## DEPLOYMENT

Para visualizar la página en producción se puede visitar el siguiente enlance:
[Ecomerce Coder house](https://oscarnovas.com)

## ESTRUCTRURA DEL PROYECTO

Descripción de la estructura de directorios y archivos del proyecto.

├── Controllers   
├── Dao           
├── Docs         
├── Dto            
├── middlewares    
├── public         
├── Routes         
├── Schemas       
├── Services       
├── Test          
├── Utils          
├── Views          
└── App.js  


## END POINTS

**USERS:**

GET: api/users

GET: api/users/:uid\
VISTA ASOCIADA: view/layouts/updatedUser

PUT: api/users/:uid/:role\
VISTA ASOCIADA: view/layouts/updatedUser

DELETE: api/users/inactive\
VISTA ASOCIADA: view/layouts/updatedUser

**PRODUCTS:**

GET: api/products\
VISTA ASOCIADA: view/layouts/home

GET: api/products/new\
VISTA ASOCIADA: view/layouts/createProduct

GET: api/products/myProducts\
VISTA ASOCIADA: view/layouts/myProducts

GET: api/products/:pid\
VISTA ASOCIADA: view/layouts/updateProduct

POST: api/products\
VISTA ASOCIADA: view/layouts/createProduct

PUT: api/products/:pid\
VISTA ASOCIADA: view/layouts/updateProduct

DELETE: api/products/:pid\
VISTA ASOCIADA: view/layouts/myProducts


**CARTS:** 

GET: api/carts/carts/:cid\
VISTA ASOCIADA: view/layouts/cartId

GET: api/carts/carts/:cid/invoice\
VISTA ASOCIADA: view/layouts/invoice

POST: api/carts/invoice\
VISTA ASOCIADA: view/layouts/invoice

PUT: api/carts/carts/:cid/product/:pid\
VISTA ASOCIADA: view/layouts/home

DELETE: api/carts/carts/:cid/product/:pid\
VISTA ASOCIADA: view/layouts/cartId

**LOGIN:**

GET: api/sessions/register\
VISTA ASOCIADA: view/layouts/register

GET: api/sessions/login\
VISTA ASOCIADA: view/layouts/login

POST: api/sessions/register\
VISTA ASOCIADA: view/layouts/register

POST: api/sessions/login\
VISTA ASOCIADA: view/layouts/login


## PROCESO DE COMPRA:

Para seguir el proceso de compra una vez que se incializace la aplicación, se creara un usuario admin con los siguientes datos:

- email: 'admin@ecomerce.com'
- password: '123456'
- role: 'admin'

Con este usuario se pueden ingresar a aplicación se podra gestionar el update de rols de usuarios, adicionar productos al carrito, eliminar productos al carrito, update de productos, visualizar y modificar productos propios en "My Products", confirmar compra, confirmar factura ...etc

Por lo cual, se podrá desarrollar el proceso de compra con este usuario como tambien, se podra crear un usuario y luego modificar su rol a premiun.

Para relizar el proceso de compra se siguen lo siguientes pasos:

- Registrarse
- Loggeo
- Eligir productos para el carrito de compras
- Eliminar productos del carrito si es necesario
- Confirmar compra
- Confirmar factura

## FUNCIONES DE USUARIO PREMIUN

### My products:
En este vista se podra visualizar los productos del usario premiun, podra agregar como tambien eliminar productos de su lista y se le asociara el productos con la clave valor onwer a _id del usuario

## FUNCIONES DE USUARIO SOLO DE ADMIN

### Update user:
El usuario admin en este vista podra visualizar cualquier usario y cambiar su rol entre "Admin", "Premiun" y "Client". Adicional a ello, podra eliminar usarios que tenga más de dos días de inactividad.
