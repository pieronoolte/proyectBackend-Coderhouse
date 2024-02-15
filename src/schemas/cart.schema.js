
const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const cartSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },
});


const Carts = ecomerceDb.model('carts', cartSchema);

module.exports = Carts;
