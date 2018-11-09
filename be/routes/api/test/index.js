var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const User = require('../../../models/users')
const Page = require('../../../models/pages')

router.get('/', function(req, res, next) {
  res.send({ msg: 'hello', a: '괜찮아' })
});

router.get('/hello', function(req, res, next) {
  res.send({ msg: 'hello', a: 2222 })
});

router.delete('/delAll', function(req, res, next) {
  User.deleteMany({})
    .then(r => {
      console.log(r)
      return Page.deleteMany({})
    })
    .then(r => {
      console.log(r)
      res.send({ success: true, msg: '싹다지움..', token: req.token })
    })
    .catch(e => {
      console.log(e.message)
      res.send({ success: false, msg: e.message})
    })
});

router.put('/pageAuth', function(req, res, next) {
  Page.updateOne({

  })
  User.deleteMany({})
    .then(r => {
      console.log(r)
      return Page.deleteMany({})
    })
    .then(r => {
      console.log(r)
      res.send({ success: true, msg: '싹다지움..', token: req.token })
    })
    .catch(e => {
      console.log(e.message)
      res.send({ success: false, msg: e.message})
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
