'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'category_id' })
      this.belongsTo(models.Organization, { foreignKey: 'organization_id' })
      this.belongsTo(models.User, { foreignKey: 'user_id' })
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'task title must not be null',
          },
          notEmpty: {
            args: true,
            msg: 'task title must not be empty',
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'category id must not be null',
          },
          notEmpty: {
            args: true,
            msg: 'category id must not be empty',
          },
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'user id must not be null',
          },
          notEmpty: {
            args: true,
            msg: 'user id must not be empty',
          },
        },
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'organization id must not be null',
          },
          notEmpty: {
            args: true,
            msg: 'organization id must not be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  )
  return Task
}
