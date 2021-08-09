const express = require('express')

const ProjectCtrl = require('../controllers/project-ctrl')

const router = express.Router()

router.post('/project', ProjectCtrl.create)
router.put('/project/:id', ProjectCtrl.update)
router.delete('/project/:id', ProjectCtrl.remove)
router.get('/project/:id', ProjectCtrl.find)
router.get('/project', ProjectCtrl.getAll)

//router.get('/client/project/:id', ProjectCtrl.findByClient)
module.exports = router