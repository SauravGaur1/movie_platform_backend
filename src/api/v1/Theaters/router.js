const Router = require('express')
const { validate } = require('../../../middlewares/joivalidators')
const { authenticate } = require('../../../middlewares/authenticate')
const router = Router()

const {
    createSchema
} = require('./validations')

const {
    createTheater
} = require('./controller')

router.post('/create', authenticate(1), validate(createSchema), createTheater)

module.exports = router