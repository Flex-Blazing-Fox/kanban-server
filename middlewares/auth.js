const jwt = require('jsonwebtoken')
const {User,Task} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) return next( {name: "Missing access token"})
    
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_KEY)
        User.findByPk(decoded.id)
        
        .then(user => {
            console.log(user,">>>>")
            if (!user){
                throw {name: "JsonWebTokenError"}
            } else {
                req.userId = user.id
                next()
            }
        })
        .catch(err => {
            next(err)
        })
        

    }
    catch(err) {
        next( {name: "Invalid access_token"})
    }
}

const authorization = (req, res, next) => {
    const {id} = req.params

    Task.findOne({ where: {
        id : id,
        userId : req.userId
    }})
    .then((task) => {
        if(!task) throw ( {name: "Task Not Found"})

        req.task = task
        next()
    })
    .catch(err => [
        next(err)
    ])
}

module.exports = {authentication, authorization}