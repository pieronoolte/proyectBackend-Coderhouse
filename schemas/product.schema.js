const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const price = Joi.number();
const code= Joi.number();
const status = Joi.boolean();
const stock =Joi.number().min(10).max(100);
const category = Joi.string();
const thumbnails = Joi.string().uri();

const createProductSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  code: code.required(),
  price: price.required(),
  status: status.required(),
  stock: stock.required(),
  category: category.required(),
  thimbnails: thumbnails.optional()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema};
