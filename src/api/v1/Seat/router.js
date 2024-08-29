const Router = require('express');
const router = Router();
const { create, update, getSeats } = require('./controller');
const { createSchema, updateSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');

router.post('/create', validate(createSchema), create);
router.patch('/update', validate(updateSchema), update);
router.get('/', getSeats);
module.exports = router;
