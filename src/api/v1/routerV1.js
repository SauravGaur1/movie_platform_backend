const {Router} = require('express');
const router = Router();

const userRouter = require('./User/router.js');
const authRouter = require('./Auth/router.js');
const audiRouter = require('./Audi/router.js')


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/audi', audiRouter);


module.exports = router;