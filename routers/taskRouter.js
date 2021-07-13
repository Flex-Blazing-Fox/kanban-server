const TaskController = require('../controllers/taskController')
const authorization = require('../middleware/taskAthorization')

const router = require('express').Router()

router.get("/", TaskController.getAllTask)
router.post("/", TaskController.addTask)
router.get("/:id", authorization, TaskController.findTaskById)
router.put("/:id", authorization, TaskController.updateTask)
router.patch("/:id", authorization, TaskController.updateCategory)
router.delete("/:id", authorization, TaskController.deleteTask)

module.exports = router