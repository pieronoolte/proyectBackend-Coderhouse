
const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: props => `${props.value} no es un correo electrónico válido!`
    }
  },
  message: {
    type: String,
    required: true
  },
});


const Carts = ecomerceDb.model('messages', messageSchema);

module.exports = Carts;
