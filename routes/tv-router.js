const express = require('express')

const TvCtrl = require('../controllers/tv-ctrl')

const router = express.Router()

router.post('/tv', TvCtrl.create)
router.put('/tv/:id', TvCtrl.update)
router.delete('/tv/:id', TvCtrl.remove)
router.get('/tv/:id', TvCtrl.find)
router.get('/tvs', TvCtrl.getAll)

router.get('/workstation/tvs/:id', TvCtrl.findByWorkstation)

module.exports = router