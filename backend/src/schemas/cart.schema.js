
const { boolean } = require('joi');
const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const { config } = require('../../config');
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const cartSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  products: {
    type: Array,
    required: true
  },
  state: {
    type: Boolean,
    required: true,
    default: false
  },
});


const Carts = ecomerceDb.model('carts', cartSchema);

module.exports = Carts;
