const Joi = require('joi');

const common = {
    role: Joi.number().required(),
    email:Joi.string().required(),
    password:Joi.string().required(),
};


const loginSchema = Joi.object({
    ...common,
});

const signupSchema = Joi.object({
    ...common,
    username: Joi.string().optional(),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required(),
});


module.exports = {
    loginSchema,
    signupSchema
};