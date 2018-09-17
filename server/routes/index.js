const express = require('express')
const router = express.Router()
// const { signup, signin } = require('../controllers/user.controller') 
// const upload = require('../helpers/uploadHelper')

const users = require('./user.route')
const categories = require('./category.route')
const articles = require('./article.route')
const comments = require('./comment.route')

router.use('/users', users)
router.use('/categories', categories)
// router.use('/articles', articles)
// router.use('/comments', comments)

// router.post('/signup', signup)
// router.post('/signin', signin)

// router.post('/upload', upload.multer.single('image'), upload.sendUploadToGCS,
//            (req, res) => {
//     res.send({
//         status: 200,
//         message: 'Your file is successfully uploaded',
//         link: req.file.cloudStoragePublicUrl
//     })
// })

router.get('/', function(req, res, next) {
  res.send('talkasrulJS')
})

module.exports = router
// By Asrul Harahap - 2018