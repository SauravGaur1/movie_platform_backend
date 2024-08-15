const {Router} = require('express');
const router = new Router();
const {getAllStates} = require('./controller');

router.get('/',getAllStates);

module.exports = router;