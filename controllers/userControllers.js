const{ User } = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController{
    static register(req,res,next){
        const {Email,Password} = req.body
        console.log(Email,Password,"<<<")
        console.log(req.body,"<<<")
        User.create({Email,Password})
        .then(data =>{
            res.status(201).json({"message":"Account has been created","data":{id:data.id,email:data.Email}})
        })
        .catch(err=>{
            console.log(err);
            next(err)
        })
    }

    static login(req,res,next){
        const {Email,Password} = req.body
        User.findOne({
            where:{
                Email:Email
            }
        })
        .then(result =>{
            console.log(result,"masuk");
            const comparePassword = bcrypt.compareSync(Password,result.Password)
            console.log(comparePassword,"masuk");
            if (result && comparePassword){
                const payload ={id:result.id}
                const access_token = jwt.sign(payload, process.env.JWT_KEY);
                res.status(200).json({"message":"Login success",access_token:access_token})
            }
            else{
                console.log("masuk");
                throw {
                    name:'Login gagal'
                }
            }
        })
        .catch(err=>{
           next(err)
        })
    }
}
module.exports = UserController