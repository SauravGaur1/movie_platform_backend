const { Router } = require("express");
const router = Router();
const {
    getUserById,
    updateUserById
} = require('./controller.js');

router.get('/getUserById', getUserById);
router.patch('/updateUserById', updateUserById);

module.exports = router;