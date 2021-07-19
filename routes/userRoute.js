const userController = require('../controllers/userControllers');
const router = require('express').Router();

router.post('/register',userController.register)
router.post('/login',userController.login)

module.exports = router