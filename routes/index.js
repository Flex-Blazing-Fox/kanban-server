const router = require('express').Router();
const errorHandle = require('../helpers/errorHandler');
const task = require('./taskRoutes')
const user = require('./userRoute')
const { auth } = require('../helpers/auth');


router.use('/',user)
router.use(auth)
router.use('/tasks',task)
router.use(errorHandle)

module.exports = router