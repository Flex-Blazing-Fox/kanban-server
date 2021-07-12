const CategoryController = require('../controllers/CategoryController')

const router = require('express').Router()

router.get('/', CategoryController.getCategories)
router.post('/', CategoryController.addCategory)
router.put('/:id', CategoryController.editCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router