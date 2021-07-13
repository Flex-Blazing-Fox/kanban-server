const {Task, User} = require('../models')

class TaskController{
    static getAll (req, res, next) {
        Task.findAll()
        .then(task => {
            res.status(200).json({data: task})
        })
        .catch(err => {
            next(err)
        })
    }

    static addTask (req, res, nex) {
        const {title, category} = req.body

        Task.create(
            {
                title,
                category,
                userId: req.userId
            }
        )
        .then(data => {
            res.status(201).json(data)
            // console.log(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController