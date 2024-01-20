const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CartsService {

  constructor() {
    this.carts = [];
    this.generate()
  }


  async generate() {
    for (let i = 0; i < 20; i++) {
      const products = [];
      const quantityProducts = Math.floor(Math.random() * (6 - 1) + 1);
      for (let j = 0; j < quantityProducts; j++) {
        products.push({
          id: faker.string.uuid(),
          quantity: Math.floor(Math.random() * (15 - 1) + 1),
        });
      }

      this.carts.push({
        id: faker.string.uuid(),
        products: products,
      });
    }
  }


  find(size) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const carts = this.carts.slice(0, size)
        resolve(carts);
      }, 2000);
    })
  }

  async findOne(cid) {
    const cartProducts = this.carts.find(item => item.id === cid);
    if (!cartProducts) {
      throw boom.notFound('Product not found');
    }
    const products = cartProducts.products;
    return products;
  }

  async createCart() {
    const newCart = {
      id: faker.string.uuid(),
      products: []
    }
    this.carts.push(newCart);
    return newCart;
  }

  async addProduct(cid, pid, query) {
    const index = this.carts.findIndex(item => item.id === cid);
    if (index === -1) {
      throw new Error("Cart not found");
    }
    const Cart =this.carts.find(item => item.id === cid);
    const indexCart = Cart.products.findIndex(item => item.id === pid)
    if (indexCart === -1) {
      const newProductCart = {
        id: pid,
        quantity: query || 1
      }
      let productsCart = Cart.products
      productsCart = [...productsCart, newProductCart];
      return productsCart;
    } else {
      const productCart = Cart.products[indexCart];
      productCart.quantity++;
      return Cart;
    }
  }

}

module.exports = CartsService;
