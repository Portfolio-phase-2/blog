const express = require('express')
const router = express.Router()
const {createOne, deleteById} = require('../controllers/comment.controller')
const isLogin = require('../middlewares/isLogin')

router.post('/:article', isLogin, createOne)
router.delete('/:id', isLogin, deleteById)

module.exports = router
// By Asrul Harahap - 2018