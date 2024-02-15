const mongoose = require('mongoose');
const defaultConnection = mongoose.connection;
const ecomerceDb = defaultConnection.useDb('Ecomerce');

// Define el esquema del producto utilizando Mongoose
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },
  category: {
    type: String,
    required: true
  },
  thumbnails: {
    type: String,
    validate: {
      validator: function(value) {
        return /^https?:\/\/.+/.test(value);
      },
      message: 'La URL de la imagen no es válida'
    }
  }
});


const Products = ecomerceDb.model('products', productSchema);


module.exports = Products;
