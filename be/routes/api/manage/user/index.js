const router = require('express').Router()
const createError = require('http-errors')
const User = require('../../../../models/users')

router.get('/', function(req, res, next) {
  User.find().select('-pwd')
    .then(r => {
      res.send({ success: true, users: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  User.updateOne({ _id }, { $set: req.body})
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  User.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
