const router = require("express").Router();
const TaskController = require("../controllers/taskController");
const authorize = require("../middlewares/taskAuthorization");

router.get("/:id", TaskController.getTask);
router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);
router.patch("/:id", authorize, TaskController.updateTaskValue);
router.put("/:id", authorize, TaskController.updateTaskRecord);
router.delete("/:id", authorize, TaskController.deleteTask);

module.exports = router;
