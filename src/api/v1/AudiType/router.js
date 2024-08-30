const Router = require('express');
const router = Router();
const { create } = require('./controller');
const { createSchema } = require('./validations');
const { validate } = require('../../../middlewares/joivalidators');
const { authenticate } = require('../../../middlewares/authenticate')

router.post('/create', authenticate(1), validate(createSchema), create);

module.exports = router;