const { User, Task } = require('../models')
const { decodeToken } = require('../helpers/jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      return next({ name: 'MissingAccessTokenError' })
    }
    const { access_token } = req.headers
    const userDecoded = decodeToken(access_token)

    const user = await User.findByPk(userDecoded.id)

    if (!user) {
      return next({ name: 'AuthenticationError' })
    }

    req.user = user

    next()
  } catch (err) {
    return next({ name: 'AuthenticationError' })
  }
}

const authorize = async (req, res, next) => {
  const { id } = req.params
  

  try {
    const task = await Task.findByPk(id)

    if (!task) {
      return next({ name: 'NotFoundError' })
    }

    if (user_id !== task.user_id) {
      return next({ name: 'ForbiddenError' })
    }

    next()
  } catch (err) {
    next(err)
  }
}

const authorizeCreateTask = async (req, res, next) => {
  const user_organization_id = req.user.organization_id
  const { organization_id } = req.body

  try {
    if (user_organization_id != organization_id) {
      return next({ name: 'ForbiddenError' })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize,
  authorizeCreateTask
}
