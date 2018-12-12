const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const imgConvert = require('base64-img')
const sharp = require('sharp')
const fs = require('fs')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  const fn = req.file.path + 'sharp'
  sharp(req.file.path).resize(200,200).crop(sharp.strategy.entropy).toFile(fn, (err, info) => {
    if (err) return next(err)
    imgConvert.base64(fn, (err, fd) => {
      if (err) return next(err)
      fs.unlinkSync(req.file.path)
      fs.unlinkSync(fn)
      console.log(fd.length)
      res.send(fd.toString())
    })
  })
})

module.exports = router
