const { User } = require('../models')
const bcrypt = require('bcrypt')
const { generateToken } = require('../helpers/jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static async register(req, res, next) {
    let { email, first_name, last_name, password, organization_id } = req.body
    
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
          name: user.first_name + ' ' + user.last_name,
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
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        organization_id: user.organization_id,
      }

      const access_token = generateToken(payload)

      return res.status(200).json({ access_token, user: payload })
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
            name: updatedUser.first_name + ' ' + updatedUser.last_name,
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

  static async googleLogin(req, res, next) {
    try {
      const { id_token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      })
      const payload = ticket.getPayload()
      const email = payload['email']
      const name = payload['name']

      const user = await User.findOne({ where: { email } })

      if (!user) {
        const newUser = await User.create({
          email,
          first_name: name,
          password: process.env.DEFAULT_PASSWORD,
          organization_id: 1,
        })

        const access_token = generateToken({
          id: newUser.id,
          name: newUser.first_name + ' ' + newUser.last_name,
          email: newUser.email,
          organization_id: newUser.organization_id,
        })

        return res.status(201).json({
          access_token,
          user: {
            id: newUser.id,
            name: newUser.first_name + ' ' + newUser.last_name,
            email: newUser.email,
            organization_id: newUser.organization_id,
          },
        })
      }

      const clientPayload = {
        id: user.id,
        name: user.first_name + ' ' + user.last_name,
        email: user.email,
        organization_id: user.organization_id,
      }

      const access_token = generateToken(clientPayload)

      return res.status(200).json({ access_token, user: clientPayload })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = UserController
