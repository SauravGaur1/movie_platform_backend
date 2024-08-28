const Joi = require('joi');
const {getAudiType , getSeatCodes} = require('../../../config/config')
const { isValidNoOfSeats } = require('../../../utils/validators')
const { getObjectKeys, getObjectValues } = require('../../../utils/sanitize')
console.log(getObjectValues(getAudiType()),getAudiType)

const createSchema = Joi.object({
  theatre_id: Joi.number().positive().required(),
  name: Joi.string().required(),
  type: Joi.string().valid(...getObjectValues(getAudiType())).required(),
  layout: Joi.array().items(Joi.array().items(Joi.number().valid(...getObjectKeys(getSeatCodes()), 0))).required(),
  no_of_seats: Joi.number().custom(isValidNoOfSeats, 'Custom Validation').required()
});

const updateSchema = Joi.object({});

const audiSchema = Joi.object({
  id: Joi.string().required(),
});

const audiListSchema = Joi.object({});

module.exports = {
  createSchema,
  updateSchema,
  audiSchema,
  audiListSchema,
};
