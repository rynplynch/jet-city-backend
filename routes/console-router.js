const express = require('express')

const ConsoleCtrl = require('../controllers/console-ctrl')

const router = express.Router()

router.post('/console', ConsoleCtrl.create)
router.put('/console/:id', ConsoleCtrl.update)
router.delete('/console/:id', ConsoleCtrl.remove)
router.get('/console/:id', ConsoleCtrl.find)
router.get('/consoles', ConsoleCtrl.getAll)

router.get('/workstation/consoles/:id', ConsoleCtrl.findByWorkstation)

module.exports = router