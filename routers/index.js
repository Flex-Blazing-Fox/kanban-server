const UserController = require('../controllers/userController')
const authentication = require('../middleware/auth')

const router = require('express').Router()
const taskRouters = require('./taskRouter')

router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.use("/tasks", authentication, taskRouters)


module.exports = router