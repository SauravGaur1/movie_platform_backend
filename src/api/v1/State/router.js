const { Router } = require('express');
const router = new Router();
const { getAllStates ,getCitiesByStateId} = require('./controller');

router.get('/', getAllStates);
router.get('/:state_id', getCitiesByStateId);

module.exports = router;