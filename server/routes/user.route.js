const express = require('express')
const router = express.Router()
const {signup, signin, getAll} = require('../controllers/user.controller')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/', getAll)

module.exports = router
// By Asrul Harahap - 2018