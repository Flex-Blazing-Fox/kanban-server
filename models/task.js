"use strict";
const { Model } = require("sequelize");
const moment = require("moment");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  Task.init(
    {
      user_id: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isAppropriateLength(value) {
            if (value.length > 100) {
              throw new Error(
                "Title's length cant be more than 100 characters"
              );
            }
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        validate: {
          isAppropriateLength(value) {
            if (value.length > 500) {
              throw new Error(
                "Description's length cant be more than 500 characters"
              );
            }
          },
        },
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [["high", "medium", "low"]],
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          isIn: [["backlog", "todo", "in progress", "done"]],
        },
      },
      due_date: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: false,
          notEmpty: true,
          isValidDate(value) {
            if (
              !moment(value, moment.ISO_8601, true).isValid() ||
              value.length < 19
            ) {
              throw new Error(
                "Input the date and time format string (YYYY-MM-DD hh:mm:ss)"
              );
            } else if (moment(value, "YYYY-MM-DD hh:mm:ss") < moment()) {
              throw new Error(
                "Due datetime can't be less than current datetime"
              );
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
