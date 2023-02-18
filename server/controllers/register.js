const User = require('../db/model/user')
const {badRequestError, unAuthenticatedError} = require('../errors/index')

const {StatusCodes} = require('http-status-codes')
const sendMail = require("../utils/sendMail");

const SignUp = async (req, res) =>{
    const {name, email} = req.body;
    let rnum = Math.floor(Math.random() * name.length);
    let randomPassword = name.substring(rnum,rnum+3) + '@' + email.substring(rnum+1,rnum+4) + rnum + 1000;
    const user = await User.create({name, email, password: randomPassword});
    if(user) {
        await sendMail(email, {
            subject: 'Account Created',
            content: `
                <h3>You have successfully created your account on Auto Room</h3>
                <p>Use following password to login to your account</p>
                <b>Your password:</b> ${randomPassword}
                <p>
                 <b>Note:</b> Please do not share this pasword to anyone
                </p>`
        })
    }

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
