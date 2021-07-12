const TaskController = require('../controllers/TaskController')
const { authorize, authenticate, authorizeCreateTask } = require('../middleware/auth')

const router = require('express').Router()

router.use(authenticate)
router.post('/', authorizeCreateTask, TaskController.addTask)
router.get('/:organization_id', TaskController.getTasks)
router.put('/:id', authorize, TaskController.editTask)
router.patch('/:id', authorize, TaskController.updateTask)
router.delete('/:id', authorize, TaskController.deleteTask)

module.exports = router