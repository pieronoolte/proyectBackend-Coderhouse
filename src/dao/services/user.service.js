const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UserService {

  constructor() {
    this.users = [];
    this.generate()
  }

  async generate() {
    for (let i = 0; i < 50; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        birthdate: faker.date.birthdate(),
        mail: faker.internet.email(),
        phone: faker.phone.number(),
        adress:faker.location.direction(),
        password: faker.internet.password()
      })
    }}


  find(size) {
    return new Promise ((resolve, reject) => {
      setTimeout(() =>{
        const users = this.users.slice(0, size)
        resolve(users);
      },2000);
    })
  }

  async findOne(uid) {
    const user = this.users.find(item => item.id === uid);
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }


}


//   async create(data) {
//     const newProduct ={
//       id: faker.string.uuid(),
//       ...data
//     }
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   async update(pid,changes) {
//     const index = this.products.findIndex(item => item.id === pid)
//     if(index === -1){
//       throw boom.notFound('Product not found');
//     }
//     const product = this.products[index];
//     this.products[index] = {
//       ...product,
//       ...changes
//     };
//     return this.products[index];
//   }

//   async delete(id) {
//     const index = this.products.findIndex(item => item.id === id)
//     if(index === -1){
//       throw boom.notFound('Product not found');
//     }
//     this.products.splice(index,1);
//     return {id};
//   }
// }

module.exports = UserService;
