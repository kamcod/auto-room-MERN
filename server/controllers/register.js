
const User = require('../db/model/user')
const {badRequestError, unAuthenticatedError} = require('../errors/index')

const {StatusCodes} = require('http-status-codes')

const SignUp = async (req, res) =>{
    const user = await User.create({...req.body})
    // TODO: send email here!
    res.status(StatusCodes.CREATED).json({name: user.name})
}
const SignIn = async (req, res) =>{
    const { email, password } = req.body

    if (!email || !password) {
        throw new badRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user || user.isAdmin) {
        throw new unAuthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.matchPassword(password)

    if (!isPasswordCorrect) {
        throw new unAuthenticatedError('Invalid Credentials')
    }
    // if (!user.isVerified) {
    //     throw new unAuthenticatedError('Please verify your email');
    // }

    const token = user.createJWT()
    res.cookie("token", token, { httpOnly: true, secure: false })
    res.status(200).json({ user: { name: user.name } })
}

const Logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ logout: "logout successful" })
}

module.exports = {SignUp, SignIn, Logout}
