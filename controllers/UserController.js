const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body

        User.create({ email, password })
        .then((user) => {
            res.status(201).json({ success: true, message : "User Created" })
        })
        .catch((err) => {
            next(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    id: user.id
                }
                const access_token = jwt.sign(payload, "secret")
                res.status(200).json({success:true, access_token})
            } else {
                throw {
                    name: "Email or Password is wrong"
                }
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static googleLogin(req,res, next) {
        const { idToken } = req.body
        let email;
        let statusCode = 200

        client.verifyIdToken({
            idToken,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then((ticket) => {
            email = ticket.getPayload().email
            return User.findOne({where: {email}})
        })
        .then((user) => {
            if (user) return user
            statusCode = 201
            return User.create({
                email,
                password: process.env.DEFAULT_PASSWORD
            })
        })
        .then((user) => {
            const access_token = jwt.sign({id : user.id}, process.env.JWT_KEY)
            res.status(statusCode).json({access_token})
        })
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = UserController