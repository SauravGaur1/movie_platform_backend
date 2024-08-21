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

router.get('/get-audi-by-id', [
  authenticate(),
  validate(audiSchema),
  getAudiById,
]);

router.get('/get-audi-by-theatre-id', [
  authenticate(),
  validate(audiListSchema),
  getAudiListByTheatreId,
]);

router.post('/create-audi', [
  authenticate(),
  validate(createSchema),
  createAudi,
]);

router.patch('/update-audi', [
  authenticate(),
  validate(updateSchema),
  updateAudi,
]);

module.exports = router
