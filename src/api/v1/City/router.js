const { Router } = require('express');
const router = new Router();
const { getPopularCities, getCitiesByStateId, searchCity } = require('./controller');

router.get('/', getPopularCities);
router.get('/', getCitiesByStateId);
router.get('/', searchCity);

module.exports = router;