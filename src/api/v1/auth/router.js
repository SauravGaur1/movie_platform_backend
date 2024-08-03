const { Router } = require("express");
const router = Router();

const { validate } = require("../../../middlewares/joivalidators.js");

const {
    signupSchema,
    loginSchema
} = require('./validations.js');

const {
    signup,
    login
} = require('./controller.js');

router.post('/signup', [
    validate(signupSchema),
    signup
]);

router.post('/login', [
    validate(loginSchema),
    login
]);

module.exports = router;