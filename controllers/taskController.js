const { Task } = require("../models");
const getAuthorizedTasks = require("../helpers/getAuthorizedTasks");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");

class taskController {
  static getAllTasks(_, res, next) {
    Task.findAll()
      .then((results) => {
        results = results.map((result) => result.dataValues);
        res.status(200).json(results);
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static getTask(req, res, next) {
    let { id } = req.params;
    Task.findOne({
      where: {
        id: +id,
      },
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        next({ name: "INTERNAL SERVER ERROR" });
      });
  }
  static createTask(req, res, next) {
    let { title, description, priority, category, due_date } = req.body;
    Task.create(
      {
        user_id: +req.userId,
        title: title,
        description: description,
        priority: priority,
        category: category,
        due_date: due_date,
      },
      {
        returning: true,
        plain: true,
      }
    )
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          next({
            name: "SEQUELIZE VALIDATION ERROR",
            details: getValidationErrorDetails(err),
          });
        } else {
          next({ name: "INTERNAL SERVER ERROR" });
        }
      });
  }
  static updateTaskValue(req, res, next) {
    const { id } = req.params;
    let tasks = getAuthorizedTasks(req, id);
    if (tasks) {
      Task.update(req.body, {
        where: {
          id: +id,
        },
        returning: true,
      })
        .then((result) => res.status(200).json(result[1][0]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            next({
              name: "SEQUELIZE VALIDATION ERROR",
              details: getValidationErrorDetails(err),
            });
          } else {
            next({ name: "INTERNAL SERVER ERROR" });
          }
        });
    } else {
      next({ name: "TASK NOT FOUND / AUTHORIZED", id: id });
    }
  }
  static updateTaskRecord(req, res, next) {
    let { id } = req.params;
    const keys = ["title", "description", "priority", "category", "due_date"];
    let hasAllKeys = keys.every((item) => req.body.hasOwnProperty(item));
    let tasks = getAuthorizedTasks(req, id);
    if (!hasAllKeys) {
      next({ name: "UPDATE METHOD NEED ALL DATA" });
    } else if (tasks) {
      let { title, description, priority, category, due_date } = req.body;

      Task.update(
        { title, description, priority, category, due_date },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      )
        .then((result) => res.status(200).json(result[1][0]))
        .catch((err) => {
          if (err.name === "SequelizeValidationError") {
            next({
              name: "SEQUELIZE VALIDATION ERROR",
              details: getValidationErrorDetails(err),
            });
          } else {
            next(err);
          }
        });
    } else {
      next({ name: "TASK NOT FOUND / AUTHORIZED", id: id });
    }
  }

  static deleteTask(req, res, next) {
    let { id } = req.params;
    let tasks = getAuthorizedTasks(req, id);
    if (tasks) {
      Task.destroy({
        where: {
          id: +id,
        },
        returning: true,
      })
        .then((_) =>
          res
            .status(200)
            .json({ message: `Record with id ${id} successfully deleted` })
        )
        .catch((err) => {
          next(err);
        });
    } else {
      next({ name: "TASK NOT FOUND / AUTHORIZED", id: id });
    }
  }
}

module.exports = taskController;
