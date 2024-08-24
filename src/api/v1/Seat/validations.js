const Joi = require('joi');

const common = {
  category: Joi.string().trim(),
  seat_code: Joi.number().integer().positive().max(10)
}

const createSchema = Joi.object({
  category: common["category"].required(),
  seat_code: common["seat_code"].required(),
});

const updateSchema = Joi.object({
  ...common,
  id: Joi.number().required(),
}).or("category", "seat_code")

module.exports = {
  createSchema,
  updateSchema,
};