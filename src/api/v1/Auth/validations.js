const Joi = require("joi");

const common = {
    role: Joi.number().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
};
// role_name: Joi.string().valid('ADMIN','USER').required()

const loginSchema = Joi.object({
    ...common,
});

const signupSchema = Joi.object({
    ...common,
    name: Joi.string().required(),
    mobile:Joi.number().required(),
});

module.exports = {
    loginSchema,
    signupSchema,
};
