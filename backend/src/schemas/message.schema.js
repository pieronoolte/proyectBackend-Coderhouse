
const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const messageSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: props => `${props.value} no es un correo electrónico válido!`
    }
  },
  username:{
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false
  },
});


const Messages = ecomerceDb.model('messages', messageSchema);

module.exports = Messages;
