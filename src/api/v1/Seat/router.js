const Router = require('express');
const router = Router();
const { create, update, getSeats } = require('./controller');
const { createSchema, updateSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');
const { authenticate } = require('../../../middlewares/authenticate')

router.post('/create', authenticate(1), validate(createSchema), create);
router.patch('/update', authenticate(1), validate(updateSchema), update);
router.get('/', authenticate(1), getSeats);
module.exports = router;
