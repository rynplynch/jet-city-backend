const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', UserCtrl.create)
router.put('/user/:id', UserCtrl.update)
router.delete('/user/:id', UserCtrl.remove)
router.get('/user/:id', UserCtrl.find)
router.get('/users', UserCtrl.getAll)

module.exports = router