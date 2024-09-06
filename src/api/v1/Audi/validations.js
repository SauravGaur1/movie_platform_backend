const Joi = require('joi');

const common = {
  id: Joi.number().required(),
  theater_id: Joi.number().positive().required(),
  name: Joi.string().trim(),
  type: Joi.number(),
  layout: Joi.array().items(Joi.array().items(Joi.number().integer().min(0).max(14))),
  no_of_seats: Joi.number().integer().positive().max(1000)
}

const createSchema = Joi.object({
  theater_id: common.theater_id,
  name: common.name.required(),
  type: common.type.required(),
  layout: common.layout.required(),
  no_of_seats: common.no_of_seats.required()
});

const updateSchema = Joi.object({
  id: common.id,
  name: common.name,
  type: common.type,
  layout: common.layout,
  no_of_seats: common.no_of_seats
}).or("name", "type", "layout").and("layout", "no_of_seats")

module.exports = {
  createSchema,
  updateSchema
};
