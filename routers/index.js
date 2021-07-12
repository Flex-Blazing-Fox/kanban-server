const routers = require('express').Router()
const userRouter = require('./userRouter')
const orgRouter = require('./orgRouter')
const catRouter = require('./catRouter')
const taskRouter = require('./taskRouter')

routers.use('/users', userRouter)
routers.use('/organizations', orgRouter)
routers.use('/categories', catRouter)
routers.use('/tasks', taskRouter)

module.exports = routers