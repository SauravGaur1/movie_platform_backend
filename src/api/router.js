const {Router} = require('express');
const router = Router();

const routerV1 = require('./v1/routerV1.js');

router.use('/api/v1', routerV1);

module.exports = router;