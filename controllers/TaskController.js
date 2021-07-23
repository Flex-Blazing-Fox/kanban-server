const { Task, Category } = require('../models')

class TaskController {
  static async getTasks(req, res, next) {
    const { organization_id } = req.params
    try {
      const tasks = await Task.findAll({
        where: { organization_id },
        include: Category,
      })

      if (!tasks.length) {
        return next({ name: "NotFoundError"})
      }

      res.status(200).json(tasks)
    } catch (err) {
      next(err)
    }
  }

  static async addTask(req, res, next) {
    let { title, category_id, user_id, organization_id } = req.body

    try {
      const task = await Task.create({
        title,
        category_id,
        user_id,
        organization_id,
      })
      
      return res.status(201).json({ task })
    } catch (err) {
      return next(err)
    }
  }

  static async editTask(req, res, next) {
    const { id } = req.params
    if (!id) return next({ name: 'NotProvideParamError' })

    const { title, category_id, user_id, organization_id } = req.body

    try {
      const task = await Task.update(
        { title, category_id, user_id, organization_id },
        {
          where: { id },
          returning: true,
        }
      )

      if (task[0] === 0) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ task: task[1][0] })
    } catch (err) {
      next(err)
    }
  }

  static async updateTask(req, res, next) {
    const { id } = req.params
    const { category_id } = req.body

    try {
      const task = await Task.update(
        { category_id },
        {
          where: { id },
          returning: true,
        }
      )

      if (task[0] === 0) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ task: task[1][0] })
    } catch (err) {
      next(err)
    }
  }

  static async deleteTask(req, res, next) {
    const { id } = req.params

    try {
      const rows = await Task.destroy({ where: { id } })

      if (!rows) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ message: `Task succesfully deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController
