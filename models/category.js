'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Task, { foreignKey: 'category_id' })
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'category name must not be null'
          },
          notEmpty: {
            args: true,
            msg: 'category name must not be empty'
          }
        }
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  )
  return Category
}
