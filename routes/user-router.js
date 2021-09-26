const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', UserCtrl.create)
router.put('/user/:id', UserCtrl.update)
router.delete('/user', UserCtrl.remove)
router.get('/user/:id', UserCtrl.findById)
router.get('/user', UserCtrl.findAll)

module.exports = router