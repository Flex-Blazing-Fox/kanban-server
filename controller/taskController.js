const { Task } = require('../models')
class TaskController{
    static readAll(req, res, next){
        Task.findAll()
        .then(result => {
            if(result.length>0){
                res.status(200).json(result)
            }
            else{
                throw{name: 'TASK_NOT_FOUND'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
    static readDetail(req, res, next){
        const {id} = req.params
        Task.findOne({
            where : {id},
        })
        .then(result=>{
            if(!result){
                throw {name: 'TASK_NOT_FOUND'}
            }else{
                res.status(200).json({result})
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    static addTask(req, res, next){
        const {title} = req.body
        Task.create({title, userId: req.userId})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
    }
    static delete(req, res, next){
        const task = req.task
        task.destroy()
        .then(() => {
            res.status(200).json({message: "Success deleted task"})
        })
        .catch(err => {
            next(err)
        })
    }
    static updateTitle(req, res, next){
        const task = req.task
        const {title} = req.body
        task.title = title

        task.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static updateCategory(req, res, next){
        const task = req.task
        const { category } = req.body
        task.category = category
        
        task.save()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController