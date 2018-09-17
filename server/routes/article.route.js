const express = require('express')
const router = express.Router()
const {getAll} = require('../controllers/article.controller')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', getAll)

module.exports = router
// By Asrul Harahap - 2018