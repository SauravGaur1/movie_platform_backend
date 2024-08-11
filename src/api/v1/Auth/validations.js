const Joi = require("joi");

const common = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.number().valid(0, 1).required(),
};

const loginSchema = Joi.object({
    ...common,
});

const signupSchema = Joi.object({
    ...common,
    name: Joi.string().required(),
    mobile: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required()
        .messages({
            "number.base": "cannot contain decimal.",
            "number.min": "Mobile number must be 10 digits long.",
            "number.max": "Mobile number must be exactly 10 digits long.",
            "any.required": "Mobile number is required.",
        }),
});

module.exports = {
    loginSchema,
    signupSchema,
};
