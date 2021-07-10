const routers = require("express").Router();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRouter");
const authentication = require("../middlewares/authentication");

routers.get("/", (_, res) => res.status(200).send("Welcome"));

routers.use("/user", userRouter);
routers.use(authentication);
routers.use("/task", taskRouter);

module.exports = routers;
