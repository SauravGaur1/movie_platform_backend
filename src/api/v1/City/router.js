const { Router } = require('express');
const router = new Router();
const { getPopularCities } = require('./controller');

router.get('/', getPopularCities);

module.exports = router;