const router = require('express').Router()
const createError = require('http-errors')
const Board = require('../../../../models/boards')

router.post('/', (req, res, next) => {
  const { name, lv, rmk } = req.body
  Board.create({ name, lv, rmk })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/', function(req, res, next) {
  Board.find()
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  Board.updateOne({ _id }, { $set: req.body})
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  Board.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
