const TaskController = require('../controllers/TaskController')
const { authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/',TaskController.getAll)
router.post('/',TaskController.addTask)
router.put('/:id',authorization,TaskController.putTask)
router.patch('/:id',authorization,TaskController.patchTask)
router.delete('/:id',authorization,TaskController.deleteTask)

module.exports = router