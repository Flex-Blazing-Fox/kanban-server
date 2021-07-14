const task = require('../controllers/taskControllers');
const { author } = require('../helpers/auth');
const router = require('express').Router();

router.get('/',task.listTask)
router.post('/',task.addTask)
router.delete('/:id',author,task.deleteTask)
router.put('/:id',author,task.putTask)
router.patch('/:id',author,task.patchTask)

module.exports = router