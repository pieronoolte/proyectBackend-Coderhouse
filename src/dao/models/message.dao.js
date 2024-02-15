const Message = require('../../schemas/message.schema');
const MongoLib = require('../mongo.dao')


class MessagesService {

  constructor() {
    this.collection = Message;
    this.mongoDB = new MongoLib(Message);
  }

  find(size) {
    return  this.mongoDB.find(this.collection, size)
  }

 findOne(mid) {
    return this.mongoDB.findOne(this.collection, mid);
  }

  createMessage(data) {
    return this.mongoDB.createOne(this.collection, data);
  }

}

module.exports = MessagesService
