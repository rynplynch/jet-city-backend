const express = require('express')

const CommentCtrl = require('../controllers/comment-ctrl')

const router = express.Router()

router.post('/comment', CommentCtrl.create)
router.put('/comment/:id', CommentCtrl.update)
router.delete('/comment/:id', CommentCtrl.remove)
router.get('/comment/:id', CommentCtrl.find)
router.get('/comments', CommentCtrl.getAll)

router.get('/workstation/comments/:id', CommentCtrl.findByWorkstation)

module.exports = router