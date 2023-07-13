const express = require('express')
const router = express.Router()

const {SignUp, SignIn, Logout} = require('../controllers/register')

router.route('/register').post(SignUp)
router.route('/login').post(SignIn)
router.route('/logout').delete(Logout)


module.exports = router
