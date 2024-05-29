const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
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
});


const Users = ecomerceDb.model('users', userSchema);


module.exports = Users;
