const {User, Task} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    if(!req.headers.access_token){
        throw {name: 'NOT_LOGIN'}
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        User.findOne({where:{
            id: decoded.userId
        }})
        .then(result=>{
            if(result){
                req.userId = result.id
                next() 
            }else{
                throw{name: 'USER_NOT_FOUND'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    catch(err){
        next({name: 'INVALID_TOKEN'})
    }
}
const authorization = (req, res, next)=>{
    const{id} = req.params
    console.log(id);
    Task.findOne({
        where:{
            id, 
            userId: req.userId
        }
    })
    .then(result=>{
        if(!result){
            throw {name: 'TASK_NOT_FOUND'}
        }else{
            req.task = result
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authentication, authorization}