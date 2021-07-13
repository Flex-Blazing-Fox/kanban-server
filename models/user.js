'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.Task,{foreignKey:'userID'})
      // define association here
    }
  };
  user.init({
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
      beforeCreate:pass=>{
        const salt = bcrypt.genSaltSync(11)
        const hash = bcrypt.hashSync(pass.Password,salt)
        pass.Password = hash
      }
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};