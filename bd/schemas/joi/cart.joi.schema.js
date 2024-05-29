const Joi = require('joi');

const cid = Joi.string().uuid();
const pid = Joi.alternatives().try(
  Joi.string().uuid(),
  Joi.number()
);


const getCartSchema = Joi.object({
  cid: cid.required(),
  pid: pid.required(),

});



module.exports = { getCartSchema};
