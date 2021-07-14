const UserController = require('../controllers/userController')
const authentication = require('../middleware/auth')

const router = require('express').Router()
const taskRouters = require('./taskRouter')
const userRouters = require('./userRouter')

router.use("/users", userRouters)
router.use("/tasks", authentication, taskRouters)


module.exports = router