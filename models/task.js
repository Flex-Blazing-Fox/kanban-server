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
      // define association here
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Title cannot be null'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Backlog',
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'Category cannot be null'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'UserId cannot be null'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  Task.associate = function(models){
    Task.belongsTo(models.User, {foreignKey: 'userId'})
  }
  return Task;
};