
// const mongoose = require('mongoose');
// const Products = require('../schemas/product.schema');
// const { faker } = require('@faker-js/faker');
// const boom = require('@hapi/boom');
// const { ObjectId } = mongoose.Types;

// const Products = require('../schemas/product.schema');
// const Users = require('../schemas/user.schema');
const { generateMongo, findMongo, findOneMongo, updateMongo, deleteMongo } = require('../services/mongo.service')

class MongoLib {

  constructor(schema, otherSchema) {
    this.structureSchema = {};
    this.stringSchema = '';
  }


  async generate(schema, quantity, otherSchema) {
    generateMongo(schema, quantity, otherSchema)
  }

  async find(schema, size) {
    const service = await findMongo(schema, size)
    return service
  }

  async findOne(schema, id) {
    const service = await findOneMongo(this, schema, id)
    return service
  }

  async createOne(schema, data) {
    const service = await schema.create(data);
    return service;
  }

  async update(schema, id, changes) {
    const service = await updateMongo(schema, id, changes)
    return service
  }

  async delete(schema, id) {
    const service = await deleteMongo(schema, id)
    return service
  }

}


module.exports = MongoLib;
