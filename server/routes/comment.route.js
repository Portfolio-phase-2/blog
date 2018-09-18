const express = require('express')
const router = express.Router()
const {createOne, deleteById} = require('../controllers/comment.controller')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/', isLogin, isAdmin, createOne)
router.put('/:id', isLogin, deleteById)

module.exports = router
// By Asrul Harahap - 2018