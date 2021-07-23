const { User } = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {

    if(!req.headers.access_token){
        throw {name:"NOT_LOGIN"}
    }

    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.SECRET_KEY)
        req.userId = decoded.id
        
        User.findOne({
            where:{id:decoded.id}
        })
            .then(result => {
                if(result){
                    next()
                }else {
                    throw {name:"USER_DATA_NOT_FOUND"}
                }
            })
            .catch(err => {
                next(err)
            })
    }
    catch(err){
        throw {name:"INVALID_TOKEN"}
    }
}

module.exports = authentication