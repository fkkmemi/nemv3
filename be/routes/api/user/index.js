const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const imgConvert = require('base64-img')
const fs = require('fs')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  imgConvert.base64(req.file.path, (err, fd) => {
    if (err) return next(err)
    fs.unlinkSync(req.file.path)
    res.send(fd.toString())
  })
})

module.exports = router
