const{Task} = require('../models')

class TaskControllers{
    static listTask(req,res,next){
        Task.findAll()
        .then(result=>{
            if (result.length === 0) {
                res.status(204).json({"message":"Task tidak ditemukan"})
            }else{
                res.status(200).json({Task:result})
            }
        })
        .catch((err) => {
              next(err)
          });
    }
   
    static putTask(req,res,next){
        const {title,Category} = req.body
        const {Task} = req
        console.log({title,Category});
        Task.title = title
        Task.Category = Category
        Task.save()
        .then(Task=>{
            res.status(200).json({data:Task,message:"Task successfully updated"})
        })
        .catch((err) => {
            next(err)
        });
    }

    static addTask(req,res,next){
        const {title,Category} = req.body
        
        Task.create({title,Category,userID:req.userID})
        .then(result => {
            res.status(201).json({messsage:"Task successfully added",data:result})
        })
        .catch((err) => {
           next(err)
        });
    }

    static deleteTask(req,res,next){
        const {Task} = req
        Task.destroy()
        .then(() => {
            res.status(200).json({"message":"Task success to delete"})
        })
        .catch((err) => {
           next(err)
          });
    }

    static patchTask(req,res,next){
        const {Task} = req
        const {Category} = req.body
        Task.Category = Category
        Task.save()
        .then(()=>{
            res.status(200).json({data:Task,message:"Category successfully updated"})
        })
        .catch((err) => {
            next(err)
          });
    }

}
module.exports = TaskControllers