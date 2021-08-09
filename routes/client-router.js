const express = require('express')

const ClientCtrl = require('../controllers/client-ctrl')

const router = express.Router()

router.post('/client', ClientCtrl.create)
router.put('/client/:id', ClientCtrl.update)
router.delete('/client/:id', ClientCtrl.remove)
router.get('/client/:id', ClientCtrl.find)
router.get('/client', ClientCtrl.getAll)

module.exports = router