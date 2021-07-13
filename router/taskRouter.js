const TaskController = require('../controller/taskController')
const {authorization} = require('../middleware/auth')

const router = require('express').Router()

router.get('/', TaskController.readAll)
router.post('/', TaskController.addTask)
router.get('/:id', TaskController.readDetail)
router.put('/:id', authorization, TaskController.updateAll)
router.patch('/:id', authorization, TaskController.updateCategory)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router