'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Task, { foreignKey: 'user_id' })
      this.belongsTo(models.Organization, { foreignKey: 'organization_id' })
    }

    get fullName() {
      return this.first_name + ' ' + this.last_name
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: {
            args: true,
            msg: 'email must not be empty',
          },
          notNull: {
            args: true,
            msg: 'email must not be null',
          },
        },
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'first name must not be empty',
          },
          notNull: {
            args: true,
            msg: 'first name must not be null',
          },
        },
      },
      last_name: DataTypes.STRING,
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'password must not be empty',
          },
          notNull: {
            args: true,
            msg: 'password must not be null',
          },
        },
      },
      organization_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'organization must not be empty',
          },
          notNull: {
            args: true,
            msg: 'organization must not be null',
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate: function (user, options) {
          const salt = bcrypt.genSaltSync(10)
          user.password = bcrypt.hashSync(user.password, salt)
        },
      },
      modelName: 'User',
    }
  )
  return User
}
