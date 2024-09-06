const Router = require('express');
const router = Router();
const { create, update, getSeats } = require('./controller');
const { createSchema, updateSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');
const { authenticate } = require('../../../middlewares/authenticate')
const { SUPER_ADMIN } = require('../../../config/config').roleMap

router.post('/create', authenticate(SUPER_ADMIN), validate(createSchema), create);
router.patch('/update', authenticate(SUPER_ADMIN), validate(updateSchema), update);
router.get('/', authenticate(1), getSeats);
module.exports = router;
