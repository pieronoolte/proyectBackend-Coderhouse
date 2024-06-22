const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const { config } = require('../../config');
const ecomerceDb = defaultConnection.useDb('Ecomerce');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false,
    min: 8,
    max: 12
  },
  address: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    // validate: {
    //   validator: function(password) {
    //     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,30}$/.test(password);
    //   },
    //   message: props => `${props.value} no cumple con los requisitos de contraseña. Debe contener al menos una minúscula, una mayúscula, un número, un signo y tener una longitud entre 7 y 30 caracteres.`
    // }
  },
  role: {
    type: String,
    enum: ['client', 'premium', 'admin'],
    default: 'client'
  },
  lastConnection: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setDate(date.getDate() - 3);
      return date;
    },
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: false
  }
});


const Users = ecomerceDb.model('users', userSchema);


module.exports = Users;
