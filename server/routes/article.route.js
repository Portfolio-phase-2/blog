const express = require('express')
const router = express.Router()
const {createOne, getAll, getById, putById, deleteById} = require('../controllers/article.controller')
const isLogin = require('../middlewares/isLogin')
const isAdmin = require('../middlewares/isAdmin')

router.post('/',isLogin, createOne)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', isLogin, putById)
router.delete('/:id', isLogin, deleteById)

module.exports = router
// By Asrul Harahap - 2018