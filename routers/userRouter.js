const UserController = require('../controllers/userController')

const router = require('express').Router()

router.use("/register", UserController.register)
router.use("/login", UserController.login)
router.use("/googleLogin", UserController.googleLogin)

module.exports = router