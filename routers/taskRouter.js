const TaskController = require('../controllers/TaskController')
const router = require('express').Router()

router.get('/',TaskController.getAll)
router.post('/',TaskController.addTask)
router.post('/:id',)
router.post('/:id',)

module.exports = router