const router = require('express').Router();
const errorHandle = require('../middleware/errorHandler');
const task = require('./taskRoutes')
const user = require('./userRoute')
const { auth } = require('../middleware/auth');


router.use('/',user)
router.use(auth)
router.use('/tasks',task)
router.use(errorHandle)

module.exports = router