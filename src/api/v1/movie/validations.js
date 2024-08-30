const Joi = require("joi");
// console.log(Joi);
const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().optional(),
    thumbnail_portrait: Joi.object().optional(), // Assuming this is an object or JSON data
    thumbnail_landscape: Joi.object().optional(), // Assuming this is an object or JSON data
    lang:  Joi.array().items(Joi.string()).required(), // Assuming this is an object or JSON data
    trailer: Joi.string().optional(),
    genre: Joi.object().optional(), // Assuming this is an object or JSON data
    rating: Joi.number().integer().min(0).max(10).optional().allow(null), // out of 10
    certification_type: Joi.number().integer().required(),
    duration: Joi.string()
        .regex(/^([0-9]{2}:[0-9]{2}:[0-9]{2})$/)
        .required(), //  HH:MM:SS format
    director: Joi.string().optional(),
    cast: Joi.array().items(Joi.string()).optional(), 
    release: Joi.date().required(),
});

module.exports = {
    movieAddSchema,
};
