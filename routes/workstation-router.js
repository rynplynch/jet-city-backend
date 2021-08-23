const express = require('express')

const WorkstationCtrl = require('../controllers/workstation-ctrl')

const router = express.Router()


router.post('/workstation', WorkstationCtrl.create)
router.put('/workstation/:id', WorkstationCtrl.update)
router.delete('/workstation/:id', WorkstationCtrl.remove)
router.get('/workstation/:id', WorkstationCtrl.find)
router.get('/workstation', WorkstationCtrl.getAll)

router.get('/project/workstation/:id', WorkstationCtrl.findByProject)
module.exports = router