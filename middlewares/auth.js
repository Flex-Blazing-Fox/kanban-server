const jwt = require('jsonwebtoken')
const {Task} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) return next( {name: "Missing access token"})

    try{
        const decoded = jwt.verify(req.headers.access_token, "secret")
        req.userId = decoded.id
        next()
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