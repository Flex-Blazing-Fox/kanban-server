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
      Task.belongsTo(models.User,{foreignKey:'userID'})
      // define association here
    }
  };
  Task.init({
    title: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    Category:{
      type:DataTypes.STRING,
      defaultValue:"Back Log",
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    userID:{
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};