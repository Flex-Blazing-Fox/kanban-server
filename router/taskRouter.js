const TaskController = require('../controller/taskController')
const {authorization} = require('../middleware/auth')

const router = require('express').Router()

router.get('/', TaskController.readAll)
router.post('/', TaskController.addTask)
router.get('/:id', TaskController.readDetail)
router.patch('/title/:id', authorization, TaskController.updateTitle)
router.patch('/category/:id', authorization, TaskController.updateCategory)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router