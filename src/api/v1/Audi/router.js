const Router = require('express');
const router = Router();

const { authenticate } = require('../../../middlewares/authenticate');
const { validate } = require('../../../middlewares/joivalidators');

const {
  audiSchema,
  audiListSchema,
  createSchema,
  updateSchema,
} = require('./validations');

const {
  getAudiById,
  getAudiListByTheatreId,
  createAudi,
  updateAudi,
} = require('./controller');

router.post('/create', [
  authenticate(1),
  validate(createSchema),
  createAudi,
]);

router.patch('/update', [
  authenticate(1),
  validate(updateSchema),
  updateAudi,
]);

router.get('/?audi_id', [
  authenticate(1),
  validate(audiSchema),
  getAudiById,
]);

router.get('/?theatre_id', [
  validate(audiListSchema),
  getAudiListByTheatreId,
]);

module.exports = router