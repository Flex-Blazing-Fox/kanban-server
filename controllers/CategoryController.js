const { Category, Task, User } = require('../models')

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.findAll({ 
        include: { 
          model: Task,
          include: User
        },
        order: ['id']
      })

      return res.status(200).json(categories)
    } catch (err) {
      next(err)
    }
  }

  static async addCategory(req, res, next) {
    let { name } = req.body
    name = name.toLowerCase()

    try {
      const category = await Category.create({ name })

      return res.status(201).json({ category })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next({ name: 'UniqueCatError' })
      }
      return next(err)
    }
  }

  static async editCategory(req, res, next) {
    const { id } = req.params
    const { name } = req.body

    try {
      const category = await Category.update(
        { name },
        {
          where: { id },
          returning: true,
        }
      )

      if (category[0] === 0) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ category: category[1][0] })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next({ name: 'UniqueCatError' })
      }
      next(err)
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.params

    try {
      const category = await Category.destroy({ where: { id } })

      if (!category) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ message: `Category succesfully deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = CategoryController
