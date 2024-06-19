
// eslint-disable-next-line no-undef
const socket = io();

socket.on('connect', () => {
  console.log('Conectado al servidor');

});

socket.on("disconnect", () => {
  console.log("El socket se ha desconectado:", socket.id);
});

socket.io.on("reconnect", () => {
  console.log("Me he vuelto a conectar")
});

let Products = []
socket.on("Products", products => {

  Products = [...Products, ...products]
});


// eslint-disable-next-line no-undef
const addProduct = document.querySelector('#addProduct')

addProduct.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  let nameProduct = document.querySelector('#nameProduct').value;
  // eslint-disable-next-line no-undef
  let priceProduct = document.querySelector('#priceProduct').value;


  socket.emit("newProduct", {
    nameProduct,
    priceProduct
  });
// eslint-disable-next-line no-undef
  document.querySelector('#nameProduct').value = "";
  // eslint-disable-next-line no-undef
  document.querySelector('#priceProduct').value = "";
});


socket.on("productNew", ({ nameProduct, priceProduct }) => {
// eslint-disable-next-line no-undef
  const productList = document.getElementById('productList');
  Products = [...Products, { title: nameProduct, price: priceProduct }]
  console.log(Products)
// eslint-disable-next-line no-undef
  const li = document.createElement('li');
  li.innerHTML = `
      <div class="li__products">
        <p>Name: ${Products[Products.length - 1].title}</p>
        <p>Price: ${Products[Products.length - 1].price}</p>
      </div>
    `;
  productList.appendChild(li);
});


// eslint-disable-next-line no-undef
const deleteProduct = document.querySelector('#deleteProduct')

deleteProduct.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  let nameDelete = document.querySelector('#nameDelete').value;

  const ProductDelete = Products.find(item => item.title === nameDelete)
  if (!ProductDelete) {
    throw Error('Product not found');
    // Agregar Toast
  } else {
    socket.emit("deleteProduct", ProductDelete);
    // eslint-disable-next-line no-undef
    document.querySelector('#nameDelete').value = "";
  }
});


socket.on("productDelete", data => {
// eslint-disable-next-line no-undef
  const productList = document.getElementById('productList');
  Products = Products.filter(item => item.title !== data.title)
  console.log(Products)

  productList.innerHTML = "";
  Products.forEach((product) => {
    // eslint-disable-next-line no-undef
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="li__products">
          <p> Name: ${product.title}</p>
          <p> Price: ${product.price}</p>
        </div>
      `;
    productList.appendChild(li);
  });
});
