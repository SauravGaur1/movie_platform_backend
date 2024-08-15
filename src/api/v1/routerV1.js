const {Router} = require('express');
const router = Router();

const userRouter = require('./User/router.js');
const authRouter = require('./Auth/router.js');
const stateRouter = require('./State/router.js');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/states', stateRouter);


module.exports = router;