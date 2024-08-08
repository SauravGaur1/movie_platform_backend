const { Router } = require("express");
const router = Router();

const { validate } = require("../../../middlewares/joivalidators.js");

const {
    getUserByIdSchema,
    updateUserByIdScheme,
} = require('./validations.js');

const {
    getUserById,
    updateUserById
} = require('./controller.js');

router.get('/getUserById', [
    validate(getUserByIdSchema),
    getUserById
]);
router.patch('/updateUserById', [
    validate(updateUserByIdScheme),
    updateUserById
]);

module.exports = router;