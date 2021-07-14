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

    static addTask (req, res, next) {
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

    
    static putTask(req, res, next) {
        const {task} = req
        const {title,category} = req.body
        task.dataValues.category = category
        task.dataValues.title = title
        task.save()
        .then(task => {
            res.status(200).json({data: task})
        })
        .catch(err => {
            next(err)
        })
    }
    
    static patchTask(req, res, next) {
        const {task} = req
        const {category} = req.body
        task.dataValues.category = category
        task.save()
        .then(task => {
            res.status(200).json({data: task})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res, next) {
        const { id } = req.params
        Task.destroy({
            where: {id: +id},
            returning: true,
        })
        .then(() => {
            res.status(200).json({"message":"Task success to delete" })
        })
        .catch(err => {
            next(err)
        })
    }    


}

module.exports = TaskController