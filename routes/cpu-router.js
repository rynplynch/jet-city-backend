const express = require('express')

const CpuCtrl = require('../controllers/cpu-ctrl')

const router = express.Router()

router.post('/cpu', CpuCtrl.create)
router.put('/cpu/:id', CpuCtrl.update)
router.delete('/cpu/:id', CpuCtrl.remove)
router.get('/cpu/:id', CpuCtrl.find)
router.get('/cpus', CpuCtrl.getAll)

router.get('/workstation/cpus/:id', CpuCtrl.findByWorkstation)

module.exports = router