const express = require('express')
const router = express.Router()

router.use('/api', require('./hero.routes'))

module.exports = router