const Users = require('../../schemas/user.schema');
const MongoLib = require('../mongo.dao')
// const bcrypt = require('bcrypt');
const { getUserByCreds } = require('../../services/users.service')
const UserDTO = require('../../dto/UserDto');
const path = require('path');
const nodemailer = require('nodemailer')


const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'pieronolte@gmail.com',
    pass: 'ejfj vkmt amqr qyac'
  }
})

class UsersService {

  constructor() {
    this.collection = Users;
    this.mongoDB = new MongoLib(Users);
  }

  find(size) {
    return this.mongoDB.find(this.collection, size)
  }

  async findDTO(size) {
    const users = await this.mongoDB.find(this.collection, size)
    return users.map(user => new UserDTO(user))
  }

  findOne(uid) {
    return this.mongoDB.findOne(this.collection, uid);
  }

  createUser(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

  // createProduct(data) {
  //   return this.mongoDB.createOne(this.collection, data);
  // }

  updateUser(uid, changes) {
    return this.mongoDB.update(this.collection, uid, changes);
  }

  deleteUser(uid) {
    return this.mongoDB.delete(this.collection, uid);
  }

  async deleteInactiveUsers() {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    try {
      const emails = await this.collection.find({ lastConnection: { $lt: twoDaysAgo } });
      const result = await this.collection.deleteMany({ lastConnection: { $lt: twoDaysAgo } });

      // for (let i = 0; i < emails.length; i++) {
      //   let imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'imageMail.png');
      //   let sendEmail = await transport.sendMail({
      //     from: 'pieronolte@gmail.com',
      //     to: `${emails[i].email}`,
      //     subject: 'Correo de prueba',
      //     html:
      //       `<div>
      //     <h1> Este es un test!</h1>
      //     <img src="cid:imageMail"/>
      //   </div>`,
      //     attachments: [{
      //       filename: ' imageMail.png',
      //       path: imagePath,
      //       cid: 'imageMail'
      //     }]
      //   })
      // }

      console.log(emails)
        await emails.map(async (email) => {
          let imagePath = path.join(__dirname, '..', '..', 'public', 'images', 'imageMail.png');
          await transport.sendMail({
            from: 'pieronolte@gmail.com',
            to: email.email,
            subject: 'Desactivación de cuenta',
            html: `
              <div>
                <h1>Estimad@ ${email.name} ${email.lastname}</h1>
                <p>Su cuenta ha sido desactivada por incactividad de 2 días.</p>
                <p>Lo invitamos a registrarse de nuevo! Lo esperamos!</p>
                <img src="cid:imageMail"/>
              </div>`,
            attachments: [{
              filename: 'imageMail.png',
              path: imagePath,
              cid: 'imageMail'
            }]
          });
        });
        // await Promise.all(emailPromises);

      return `Se eliminaron ${result.deletedCount} usuarios por inactividad en los últimos dos días`;
    } catch (error) {
      console.error('Error deleting inactive users:', error);
      throw error;
    }
  }

  findByEmail(email) {
    // return this.mongoDB.findByEMail(this.collection,email);
    return this.collection.findOne({ email: email })
  }

  async getUserByCreds(email, password) {
    // let user = await this.mongoDB.findByEMail(this.collection,email);
    // if (user && user.password) {

    //   let correctPwd =  bcrypt.compareSync(password, user.password);

    //   if (correctPwd) {
    //     delete user.password;
    //     return user;
    //   }

    // }

    // return null;
    return await getUserByCreds(this.collection, email, password)
  }

  async updateRole(uid, role) {
    const user = await this.collection.findById(uid)
    if (user === null) {
      throw boom.notFound(`${this.collection} not found`);
    }

    // Actualizar el rol del usuario
    await this.collection.updateOne(
      { _id: uid },
      { $set: { role: role } }
    );

    // Retornar el usuario actualizado
    const updatedUser = await this.collection.findById(uid);
    return updatedUser;
  }

}

module.exports = UsersService
