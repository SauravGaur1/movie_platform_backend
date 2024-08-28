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
  // authenticate(),
  validate(createSchema),
  createAudi,
]);

router.patch('/update', [
  authenticate(),
  validate(updateSchema),
  updateAudi,
]);

router.get('/?audi_id', [
  authenticate(),
  validate(audiSchema),
  getAudiById,
]);

router.get('/?theatre_id', [
  authenticate(),
  validate(audiListSchema),
  getAudiListByTheatreId,
]);

module.exports = router
