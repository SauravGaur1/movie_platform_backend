const {Router} = require('express');
const router = Router();

const userRouter = require('./users/router.js');
const authRouter = require('./auth/router.js');


router.use('/user', userRouter);
router.use('/auth', authRouter);


module.exports = router;