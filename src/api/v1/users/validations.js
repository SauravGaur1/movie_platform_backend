const Joi = require('joi');

const common = {
    id: Joi.number().required(),
    token: Joi.alternatives().try(
        Joi.string(),
        Joi.number()
    ).required(),
}

const getUserByIdSchema = Joi.object({
    ...common,
});

const updateUserByIdScheme = Joi.object({
    ...common,
    username: Joi.string().optional(),
    password: Joi.string().optional(),
    repeatPassword: Joi.string().optional(),
}).xor('password', 'repeatPassword') // Either both should exist or neither
  .when('password', {
    is: Joi.exist(),
    then: Joi.object({
        repeatPassword: Joi.string().valid(Joi.ref('password')).required()
    }),
    otherwise: Joi.object({
        repeatPassword: Joi.string().optional(),
    })
  });


module.exports = {
    getUserByIdSchema,
    updateUserByIdScheme
};