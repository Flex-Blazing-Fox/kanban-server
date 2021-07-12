'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      this.hasMany(models.User, { foreignKey: 'organization_id' })
      this.hasMany(models.Task, { foreignKey: 'organization_id' })
    }
  };
  Organization.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'organization name must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'organization name must not be empty'
        }
      }
    },
    logo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};