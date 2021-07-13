const router = require('express').Router()
const userRouter = require('./userRouter')
const taskRouter = require('./taskRouter')
const {authentication} = require('../middleware/auth')

router.use('/user', userRouter)
router.use('/tasks', authentication, taskRouter)

module.exports = router