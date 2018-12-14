const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')
const sharp = require('sharp')
const imageDataURI = require('image-data-uri')
const fs = require('fs')
const User = require('../../../models/users')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  // console.log(req.body)
  // console.log(req.file)
  // console.log(req.user)
  if (!req.user._id) throw createError(401, 'xxx')
  sharp(req.file.path).resize({
      width: 200,
      height: 200,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy
    }).toBuffer()
    .then(bf => {
      fs.unlinkSync(req.file.path)
      const img = imageDataURI.encode(bf, 'png')
      return User.findByIdAndUpdate(req.user._id, { $set: { img } }, { new: true }).select('-img')
      // res.send(imageDataURI.encode(bf, 'png'))
    })
    .then(r => {
      res.setHeader('Content-Type', 'text/plain')
      res.send(r._id.toString())
    })
    .catch(e => next(e))
})
router.delete('/', (req, res, next) => {
  res.status(204).send()
})

module.exports = router
