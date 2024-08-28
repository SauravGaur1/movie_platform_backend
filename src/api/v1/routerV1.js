const {Router} = require('express');
const router = Router();

const userRouter = require('./User/router.js');
const authRouter = require('./Auth/router.js');
const movieRouter=require('./Movie/router.js');


router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/movie',movieRouter);


module.exports = router;