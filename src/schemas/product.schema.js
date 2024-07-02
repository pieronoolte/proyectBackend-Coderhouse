const mongoose = require('mongoose');
var mongoosePaginate = require("mongoose-paginate-v2");


const defaultConnection = mongoose.connection;
const { config } = require('../../config');
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
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

productSchema.plugin(mongoosePaginate)

const Products = ecomerceDb.model('products', productSchema);


module.exports = Products;
