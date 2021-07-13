const { Task } = require('../models')

const authorization = (req, res, next) => {

    const { id } = req.params
    
    Task.findOne({
        where: {id, userId:req.userId}
    })
        .then(result => {
            if(!result){
                throw {name:"TASK_NOT_FOUND"}
            }else{
                req.tasks = result
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization