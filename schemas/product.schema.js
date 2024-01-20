const Joi = require('joi');

const pid = Joi.string().uuid();
const title = Joi.string();
const description = Joi.string();
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
  thumbnails: thumbnails.optional()
});

const updateProductSchema = Joi.object({
  title: title.optional(),
  description: description.optional(),
  code: code.optional(),
  price: price.optional(),
  status: status.optional(),
  stock: stock.optional(),
  category: category.optional(),
  thumbnails: thumbnails.optional()
});

const getProductSchema = Joi.object({
  pid: pid.required(),
});

const deleteProductSchema = Joi.object({
  pid: pid.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema};
