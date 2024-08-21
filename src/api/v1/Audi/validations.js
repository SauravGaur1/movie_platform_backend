const Joi = require('joi');

const common = Joi.object({});

const createSchema = Joi.object({});

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
