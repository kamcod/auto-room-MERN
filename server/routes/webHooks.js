const express = require('express')
const router = express.Router()

const { WebHook } = require('../controllers/webhooks')

router.route('stripe-hooks').post(WebHook)

// TODO: deploy on live server to access this webhook publically


module.exports = router
