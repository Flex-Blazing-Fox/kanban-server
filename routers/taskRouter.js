const TaskController = require('../controllers/taskController')

const router = require('express').Router()

router.get("/", TaskController.getAllTask)
router.post("/", TaskController.addTask)

module.exports = router