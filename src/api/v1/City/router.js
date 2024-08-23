const { Router } = require('express');
const router = new Router();
const { getPopularCities,searchCity } = require('./controller');

router.get('/', getPopularCities);

module.exports = router;