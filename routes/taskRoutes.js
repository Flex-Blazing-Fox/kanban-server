const task = require('../controllers/taskControllers');
const { author } = require('../helpers/auth');
const router = require('express').Router();
const { auth } = require('../helpers/auth');
router.get('/',task.listTask)
router.post('/',auth,task.addTask)
router.delete('/:id',auth,author,task.deleteTask)
router.put('/:id',auth,author,task.putTask)
router.patch('/:id',auth,author,task.patchTask)

module.exports = router