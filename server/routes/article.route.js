const express = require('express')
const router = express.Router()
const {createOne, getAll, getAllMine, getById, putById, deleteById} = require('../controllers/article.controller')
const isLogin = require('../middlewares/isLogin')

router.post('/',isLogin, createOne)
router.get('/', getAll)
router.get('/mine', isLogin, getAllMine)
router.get('/:id', getById)
router.put('/:id', isLogin, putById)
router.delete('/:id', isLogin, deleteById)

module.exports = router
// By Asrul Harahap - 2018