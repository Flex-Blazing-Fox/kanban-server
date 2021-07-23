const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOLGE_CLIENT_ID)

class UserController{
    static register(req, res, next){
        const { fullname, email, password } = req.body

        User.create({fullname, email,password})
            .then(() => {
                res.status(201).json({"message":"Pendaftaran Berhasil"})
            })
            .catch((err) => {
                next(err)
            })
    }
    
    static login(req, res, next){
        const { email, password } = req.body

        User.findOne({where:{email}})
            .then((user) => {
                if(user && bcrypt.compareSync(password, user.password)){
                    const payload = {
                        id: user.id
                    }

                    const access_token = jwt.sign(payload, process.env.SECRET_KEY)

                    res.status(200).json({access_token})
                }else {
                    throw {name:"LOGIN_FAILED"}
                }
            })
            .catch((err) => {
                next(err)
            })
    }

    static googleLogin(req, res, next){
        const { idToken } = req.body

        let email
        let statusCode = 200
        let fullname

        client.verifyIdToken({
            idToken,
            audience: process.env.GOOLGE_CLIENT_ID
        })
            .then((ticket) => {
                email = ticket.getPayload().email
                fullname = ticket.getPayload().name
                return User.findOne({where:{email}})
            })
            .then(user => {
                if(user){
                    return user
                }

                statusCode = 201
                return User.create({
                    fullname,
                    email,
                    password:process.env.DEFAULT_PASSWORD
                })
            })
            .then(user => {
                const access_token = jwt.sign({id:user.id}, process.env.SECRET_KEY)
                res.status(statusCode).json({access_token})
            })
            .catch(err => {
                next(err)
            })

    }
}

module.exports = UserController