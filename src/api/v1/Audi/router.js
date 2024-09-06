const Router = require('express');
const router = Router();

const { authenticate } = require('../../../middlewares/authenticate');
const { validate } = require('../../../middlewares/joivalidators');
const {ADMIN} = require('../../../config/config').roleMap

const {
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
  authenticate(ADMIN),
  validate(createSchema),
  createAudi,
]);

router.patch('/update', [
  authenticate(ADMIN),
  validate(updateSchema),
  updateAudi,
]);

router.get('/audi_id/:audi_id', [
  authenticate(),
  getAudiById,
]);

router.get('/theater_id/:theater_id', [
  authenticate(),
  getAudiListByTheatreId,
]);

module.exports = router