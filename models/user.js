'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Task, {foreignKey:'userId'})
    }
  };
  User.init({
    email: {
      allowNull:false,
      type:DataTypes.STRING,
      validate : {
        notEmpty:{
          args:false,
          msg:"Email Tidak Boleh Kosong"
        },
        isEmail:{
          args:true,
          msg:"Type of input is not Email"
        },
        notNull: {
          args:false,
          msg:"Email Tidak Boleh Null"
        }
      }
    },
    password: {
      allowNull:false,
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          args: true,
          msg: 'Password Tidak Boleh Kosong'
        },
        notNull: {
          args: true,
          msg: 'Password Tidak boleh null'
        },
        min : {
          args: 6,
          msg: 'Password minimal 6 karkter'
        }
      }
    },
  }, {
    sequelize,
    hooks:{
      beforeCreate: (user) => {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password, salt)

        user.password = hash
      }
    }
    ,
    modelName: 'User',
  });
  return User;
};