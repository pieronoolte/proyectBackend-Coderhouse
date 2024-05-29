
const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },
});


const Message = ecomerceDb.model('carts', cartSchema);

module.exports = Message;
