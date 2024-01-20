const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor() {
    this.products = [];
    this.generate()
  }

  async generate() {
    for (let i = 0; i < 50; i++) {
      this.products.push({
        id: faker.string.uuid(),
        title: faker.commerce.productName(),
        descripcion: faker.lorem.sentence(),
        code: Math.floor(Math.random() * (50000 - 10000 ) + 10000),
        price: parseInt(faker.commerce.price(), 10),
        status:faker.datatype.boolean(),
        stock: Math.floor(Math.random() * (100 - 10 ) + 10),
        category: faker.commerce.department(),
        thumbnails:faker.image.url(),
      })
    }}


  find(size) {
    return new Promise ((resolve, reject) => {
      setTimeout(() =>{
        const products = this.products.slice(0, size)
        resolve(products);
      },2000);
    })
  }


 async findOne(pid) {
    const product = this.products.find(item => item.id === pid);
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(!product.status){
      throw boom.conflict('Product is block');
    }
    return product;
  }

  async create(data) {
    const newProduct ={
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update(pid,changes) {
    const index = this.products.findIndex(item => item.id === pid)
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id === id)
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index,1);
    return {id};
  }
}

module.exports = ProductsService;
