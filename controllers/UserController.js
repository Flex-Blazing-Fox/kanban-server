const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')

class UserController {
  static async register(req, res, next) {
    const { email, first_name, last_name, password, organization_id } = req.body

    try {
      const user = await User.create({
        email,
        first_name,
        last_name,
        password,
        organization_id,
      })

      return res.status(201).json({
        user: {
          id: user.id,
          name: user.full_name,
          email: user.email,
          organization_id: user.organization_id,
        },
      })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next({ name: 'UniqueEmailError' })
      }
      return next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        return next({ name: 'IncorrectCredentialsError' })
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!isPasswordCorrect) {
        return next({ name: 'IncorrectCredentialsError' })
      }

      const payload = {
        id: user.id,
        name: user.full_name,
        email: user.email,
        organization_id: user.organization_id,
      }

      const token = generateToken(payload)

      return res.status(200).json({ token, user: payload })
    } catch (err) {
      next(err)
    }
  }

  static async forgotPassword(req, res, next) {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)

    try {
      const user = await User.update(
        { password: bcrypt.hashSync(password, salt) },
        {
          where: { email },
          returning: true,
        }
      )

      if (user[0] === 1) {
        const updatedUser = user[1][0]

        return res.status(200).json({
          user: {
            id: updatedUser.id,
            name: updatedUser.full_name,
            email: updatedUser.email,
            organization_id: updatedUser.organization_id,
          },
        })
      }

      return next({ name: 'UserNotFoundError' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
