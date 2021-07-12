const { Task } = require('../models')

class TaskController{
    static getAllTask(req, res, next){
        Task.findAll()
            .then((tasks) => {
                res.status(200).json(tasks)
            })
            .catch((err) => {
                next(err)
            })
    }

    static addTask(req, res, next){
        const { title, category} = req.body;
        
        Task.create(
            {
                title,
                category,
                userId : req.userId
            }
        )
        .then(data => {

            let result =  {
                    id : data.dataValues.id,
                    title:  data.dataValues.title,
                    category: data.dataValues.category,
                    userId: data.dataValues.userId
                }

            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController