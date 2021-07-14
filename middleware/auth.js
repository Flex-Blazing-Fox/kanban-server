const jwt = require('jsonwebtoken');
const{Task} = require('../models')
const auth = (req,res,next)=>{
    if (!req.headers.access_token) {
        return next({name:'Invalid Token'})
    }
    else{
        try {
            const tokenDecode = jwt.verify(req.headers.access_token, process.env.JWT_KEY)
            req.userID = tokenDecode.id
            next()
          }
          catch (err) {
            next({name:'invalid access token'})
          }
    }
}

const author = (req,res,next)=>{
      const {id} = req.params
      Task.findOne({where:{id:id,userID:req.userID}})
      .then(data =>{
        if (!data){
          throw{name:'Task not found'}
        }else{
          req.todo = data
          next()
         }
      })
      .catch(err=>{
        next(err)
      })
}

module.exports = {auth,author}