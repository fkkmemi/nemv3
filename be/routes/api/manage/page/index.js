var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../../models/pages')

router.get('/', function(req, res, next) {
  Page.find()
    .then(r => {
      res.send({ success: true, pages: r })
    })
    .catch(e => {
      res.send({ success: false })
    })
});

router.put('/:_id', (req, res, next) => {
  const _id = req.params._id
  Page.updateOne({ _id }, { $set: req.body})
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  const _id = req.params._id
  Page.deleteOne({ _id })
    .then(r => {
      res.send({ success: true, msg: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
