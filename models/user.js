'use strict';
const bcrypt = require('bcrypt')
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
      // define association here
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Email cannot be null'
        },
        isEmail :{
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Password cannot be null'
        },
        len: {
          args: [6, 9999],
          msg: 'Password minimum 6 characters'
        }
      }
    },
  }, {
    sequelize,
    hooks: {
      beforeCreate: (User)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(User.password, salt);
        User.password = hash
        User.confirmed = false
      }
    },
    modelName: 'User',
  });

  User.associate = function(models){
    User.hasMany(models.Task, {foreignKey: 'userId'})
  }
  return User;
};