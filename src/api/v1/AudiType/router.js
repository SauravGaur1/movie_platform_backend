const Router = require('express');
const router = Router();
const { create } = require('./controller');
const { createSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');
const { authenticate } = require('../../../middlewares/authenticate')
const { SUPER_ADMIN } = require('../../../config/config').roleMap

router.post('/create', authenticate(SUPER_ADMIN), validate(createSchema), create);

module.exports = router;