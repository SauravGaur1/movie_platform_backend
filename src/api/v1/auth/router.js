const { Router } = require("express");
const router = Router();

const {
    signupSchema,
    loginSchema
} = require('./validations.js');

const {
    signup,
    login
} = require('./controller.js');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;