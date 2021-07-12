const { Organization } = require('../models')

class OrgController {
  static async addOrg(req, res, next) {
    const { name, logo } = req.body

    try {
      const org = await Organization.create({ name, logo })

      return res.status(201).json({ organization: org })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next({ name: 'UniqueOrgError' })
      }
      return next(err)
    }
  }

  static async getOrgs(req, res, next) {
    try {
      const orgs = await Organization.findAll()

      return res.status(200).json(orgs)
    } catch (err) {
      next(err)
    }
  }

  static async getOrg(req, res, next) {
    const { id } = req.params

    try {
      const organization = await Organization.findOne({ where: { id } })

      if (!organization) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json(organization)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = OrgController
