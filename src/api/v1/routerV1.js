const { Router } = require('express');
const router = Router();

const userRouter = require('./User/router.js');
const authRouter = require('./Auth/router.js');
const seatRouter = require('./Seat/router.js');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/seat', seatRouter);

module.exports = router;