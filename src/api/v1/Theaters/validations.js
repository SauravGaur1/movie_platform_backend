const Joi = require("joi");

const createSchema = Joi.object({
    admin_id: Joi.number().positive().required(),
    name: Joi.string().trim().required(),
    city_id: Joi.number().positive().required(),
    pincode: Joi.number().min(100000).max(999999).required(),
    longitude: Joi.number().required(),
    latitude: Joi.number().required()
})

module.exports = {
    createSchema
}