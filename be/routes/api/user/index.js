const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const sharp = require('sharp')
const imageDataURI = require('image-data-uri')
const fs = require('fs')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  console.log(req.body)
  console.log(req.file)

  // const fn = req.file.path + 'sharp'
  // sharp(req.file.path).resize(200,200).crop(sharp.strategy.entropy).toFile(fn, (err, info) => {
  //   if (err) return next(err)
  //   imgConvert.base64(fn, (err, fd) => {
  //     if (err) return next(err)
  //     fs.unlinkSync(req.file.path)
  //     fs.unlinkSync(fn)
  //     console.log(fd.length)
  //     res.send(fd.toString())
  //   })
  // })
  sharp(req.file.path).resize(200,200).crop(sharp.strategy.entropy).toBuffer()
    .then(bf => {
      fs.unlinkSync(req.file.path)
      res.send(imageDataURI.encode(bf, 'png'))
    })
    .catch(e => next(e))
})

module.exports = router
