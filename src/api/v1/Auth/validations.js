const Joi = require("joi");

const common = {
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number().valid(0, 1).required(),
};

const loginSchema = Joi.object({
    ...common,
});

const signupSchema = Joi.object({
    ...common,
    name: Joi.string().required(),
    mobile: Joi.number().required(),
});

module.exports = {
    loginSchema,
    signupSchema,
};
