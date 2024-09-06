const Router = require('express')
const { validate } = require('../../../middlewares/joivalidators')
const { authenticate } = require('../../../middlewares/authenticate')
const { ADMIN } = require('../../../config/config').roleMap
const router = Router()

const {
    createSchema
} = require('./validations')

const {
    createTheater
} = require('./controller')

router.post('/create', authenticate(ADMIN), validate(createSchema), createTheater)

module.exports = router