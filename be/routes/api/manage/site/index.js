const router = require('express').Router()
const createError = require('http-errors')
const Site = require('../../../../models/sites')

router.get('/', function(req, res, next) {
  Site.find()
    .then(r => {
      res.send({ success: true, sites: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  Site.updateOne({ _id }, { $set: req.body})
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  Site.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
