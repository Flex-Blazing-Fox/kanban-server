const { Task, User } = require('../models')

class TaskController{
    static getAllTask(req, res, next){
        Task.findAll(
            {
                include: 'User',
                order:[
                    ['id', 'DESC']
                ]
            },
            
        )
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

    static findTaskById(req, res){
        
        let tasks = {
            id: req.tasks.id,
            title: req.tasks.title,
            category: req.tasks.category,
            userId:req.tasks.userId
        }
        
        res.status(200).json(tasks)
    }

    static updateTitle(req, res, next){
        const { title } = req.body
        const { tasks } = req

        tasks.title = title

        tasks
        .save()
        .then(()=>{
            res.status(201).json(tasks)
        })
        .catch(err =>{
            next(err)
        })
    }

    static updateCategory(req, res, next){
        const { category } = req.body
        const { tasks } = req
        console.log(category);
        tasks.category = category

        tasks
        .save()
        .then(() => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask(req, res, next){
        const { tasks } = req

        tasks
        .destroy()
        .then(() => {
            res.status(200).json({"message":"Tasks Successfully Deleted"})
        })
        .then(err => {
            next(err)
        })
    }
}

module.exports = TaskController