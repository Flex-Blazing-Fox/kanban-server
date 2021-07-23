const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static register(req, res, next){
        const {email, password} = req.body
        User.create({
            email,
            password   
        })
        .then(result=>{
            res.status(201).json({message: 'Successfully Register',email: result.email})
        })
        .catch(err=>{
            next(err)
        })
    }
    static login(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    userId: result.id
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({message: 'Login Success', access_token})
            }else{
                throw{name: 'LOGIN_FAILED'}
            }
        })
        .catch(err=>{
            next({name: 'LOGIN_FAILED'})
        })
    }
    static googleSignIn(req, res, next){
        const {idToken} = req.body
        let email
        const password = `GOO${Math.random(process.env.DEFAULT_PASSWORD)}`
        let status = 200
        client.verifyIdToken({
            idToken,
            audience: '579601506754-ni2ge2l5lr2sav8fr8u4ed3coadtmoe0.apps.googleusercontent.com'//process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            email = ticket.payload.email
            return User.findOne({
                where: {email}
            })
        })
        .then(user=>{
            if(user) return user
            status = 201
            return User.create({email, password})
        })
        .then(result=>{
            const payload = {
                user_id: result.id
            }
            const access_token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(status).json({message: 'Login Success', access_token})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController