'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey:'userId'})
    }
  };
  Task.init({
    title: {
      allowNull:false,
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:"Title Tidak boleh kosong"
        },
        notNull:{
          args:true,
          msg:"Title Tidak boleh null"
        }
      }
    },
    category: {
      allowNull:false,
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          args:true,
          msg:"Category Tidak boleh kosong"
        },
        notNull:{
          args:true,
          msg:"Category Tidak boleh null"
        }
      }
    },
    userId: {
      allowNull:false,
      type:DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'User Tidak Ditemukan'
        },
        notNull: {
          args: true,
          msg: 'User Tidak Ditemukan'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};