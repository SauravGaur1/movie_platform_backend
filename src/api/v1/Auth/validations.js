const Joi = require('joi');

const common = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role_name: Joi.number().valid(0,1).required()
}

const loginSchema = Joi.object({
    ...common,
});

const signupSchema = Joi.object({
    ...common,
    name: Joi.string().required()
});


module.exports = {
    loginSchema,
    signupSchema
};