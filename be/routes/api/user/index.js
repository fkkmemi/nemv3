const router = require('express').Router()
const createError = require('http-errors')
const multer = require('multer')

router.post('/', multer({ dest: 'public/' }).single('bin') ,(req, res, next) => {
  console.log(req.body)
  console.log(req.file)
  res.status(204).send()
})

module.exports = router
