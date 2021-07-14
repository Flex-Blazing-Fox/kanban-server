const router = require('express').Router()
const userRouter = require('./userRouter')
const { authentication } = require('../middlewares/auth')
const taskRouter = require('./taskRouter')
const errorHandler = require('../middlewares/errorHandler')


router.use('/', userRouter)
router.use(authentication)
router.use('/tasks', taskRouter)
router.use(errorHandler)

module.exports = router