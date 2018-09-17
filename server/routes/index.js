const express = require('express')
const router = express.Router()
const { signup, signin } = require('../controllers/userController') 
const upload = require('../helpers/uploadHelper')

router.post('/signup', signup)
router.post('/signin', signin)

router.post('/upload', upload.multer.single('image'), upload.sendUploadToGCS,
           (req, res) => {
    res.send({
        status: 200,
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
    })
})

router.get('/', function(req, res, next) {
  res.send('talkasrulJS')
})

module.exports = router
// By Asrul Harahap - 2018