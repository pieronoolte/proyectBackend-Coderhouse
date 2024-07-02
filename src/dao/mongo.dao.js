
const { generateMongo, findMongo, findOneMongo, updateMongo, deleteMongo } = require('../services/mongo.service')

class MongoLib {

  constructor(schema, otherSchema) {
    this.structureSchema = {};
    this.stringSchema = '';
    this.schema = schema;
    this.otherSchema = otherSchema;
  }


  async generate( quantity) {
    generateMongo( quantity)
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
