const { Router } = require('express');
const router = Router();

const userRouter = require('./User/router.js');
const authRouter = require('./Auth/router.js');
const stateRouter = require('./State/router.js');
const cityRouter = require('./City/router.js');
const seatRouter = require('./Seat/router.js');
const audiRouter = require('./Audi/router.js')

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/states', stateRouter);
router.use('/cities', cityRouter);
router.use('/seat', seatRouter);
router.use('/audi', audiRouter);

module.exports = router;