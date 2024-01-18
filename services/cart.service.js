const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class CartsService {

  constructor() {
    this.carts = [];
  }

  async find(cid) {
    const products = this.carts[cid].products
    if(!products){
      throw boom.notFound('Product not found');
    }
    return products;
  }

  async createCart(data) {
    const newCart ={
      id: faker.string.uuid(),
      products: data
    }
    this.carts.push(newCart);
    return newCart;
  }

  async addProduct(cid, pid, quantity) {
    const index = this.carts[cid].products.findIndex(item => item.id === pid)
    if(index === -1){
    const newProductCart ={
      id: pid,
      quantity: quantity
    }
    const productsCart = this.carts[cid].products
    productsCart = [... productsCart, newProductCart];
    return newProductCart;
  }else{
    const productCart = this.carts[cid].products[index];
    productCart.quantity++;
    return productCart;
  }
  }

}

module.exports = CartsService;
