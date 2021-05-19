const express = require('express')

const PhoneCtrl = require('../controllers/phone-ctrl')

const router = express.Router()

router.post('/phone', PhoneCtrl.create)
router.put('/phone/:id', PhoneCtrl.update)
router.delete('/phone/:id', PhoneCtrl.remove)
router.get('/phone/:id', PhoneCtrl.find)
router.get('/phones', PhoneCtrl.getAll)

router.get('/workstation/phones/:id', PhoneCtrl.findByWorkstation)

module.exports = router