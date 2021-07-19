'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task,{foreignKey:'userID'})
      // define association here
    }
  };
  User.init({
    Email:{ 
      type:DataTypes.STRING,
      allowNull:{args:false,msg:"Email has to be not null"},
      unique:{args:true,msg:"Email has been used"},
      validate:{
        notEmpty:{args:true,msg:"Email must be not empty"},
        isEmail:{args:true,msg:"Must be email format"},
      }},
    Password:{
      type:DataTypes.STRING,
      allowNull:{args:false,msg:"Password must be not empty"},
      validate:{
        notEmpty:{args:true,msg:"password must be filled"},
        len:{args:[6],msg:"Password min 6 characters"},
        is:{args:[/[0-9]/g],msg:"There must be a number"}
      }
    } 
  },{
    hooks:{
    beforeCreate:(User,options)=>{
        const salt = bcrypt.genSaltSync(9)
        const hash = bcrypt.hashSync(User.Password,salt)
        User.Password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};