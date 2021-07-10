const { Task } = require("../models");

const authorize = (req, res, next) => {
  Task.findAll({
    where: {
      user_id: req.userId,
    },
  })
    .then((results) => {
      req.authorizedTasks = results;
      next();
    })
    .catch((err) => next(err));
};

module.exports = authorize;
