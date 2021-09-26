const express = require('express')

const ProjectCtrl = require('../controllers/project-ctrl')

const router = express.Router()

router.post('/project', ProjectCtrl.create)
router.put('/project/:id', ProjectCtrl.update)
router.delete('/project', ProjectCtrl.remove)
router.get('/project/:id', ProjectCtrl.findById)
router.get('/project', ProjectCtrl.findAll)

router.get('/client/project/:id', ProjectCtrl.findByClient)
module.exports = router