const { Router } = require("express");
const router = Router();
const {
    signup,
    login
} = require('./controller.js');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;