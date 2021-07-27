const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getValidationErrorDetails = require("../helpers/getValidationErrorDetails");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

class userController {
  static register(req, res, next) {
    const { email, password } = req.body;
    User.create({
      email,
      password,
    })
      .then((result) =>
        res.status(201).json({ id: result.id, email: result.email })
      )
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
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email: email,
      },
    })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.dataValues.password)) {
          const payload = {
            id: user.dataValues.id,
          };
          const accessToken = jwt.sign(payload, process.env.JWT_SECRET);
          res.status(200).json({ access_token: accessToken });
        } else {
          throw { name: "EMAIL / PASSWORD AUTHENTICATION FAIL" };
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static googleLogin(req, res, next) {
    const { idToken } = req.body;
    let email;
    let statusCode = 200;
    client
      .verifyIdToken({
        idToken: idToken,
        audience: process.env.CLIENT_ID,
      })
      .then((ticket) => {
        email = ticket.getPayload().email;
        return User.findOne({ where: { email } });
      })
      .then((user) => {
        if (user) return user;
        statusCode = 201;
        return User.create({
          email,
          password: process.env.DEFAULT_PASSWORD,
        });
      })
      .then((user) => {
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(statusCode).json({ access_token: accessToken });
      })
      .catch((err) => next(err));
  }
}

module.exports = userController;
