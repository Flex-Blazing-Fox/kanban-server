const OrgController = require('../controllers/OrgController')

const router = require('express').Router()

router.get('/', OrgController.getOrgs)
router.get('/:id', OrgController.getOrg)
router.post('/', OrgController.addOrg)

module.exports = router