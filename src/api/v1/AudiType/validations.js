const Joi = require('joi');

const createSchema = Joi.object({
    title: Joi.string().trim().required(),
    short_name: Joi.string().trim().required()
});

module.exports = {
    createSchema,
};