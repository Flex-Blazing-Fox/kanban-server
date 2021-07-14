const router = require('express').Router();
const errorHandle = require('../helpers/errorHandler');
const task = require('./taskRoutes')
const user = require('./userRoute')

router.use('/',user)
router.use('/tasks',task)
router.use(errorHandle)

module.exports = router