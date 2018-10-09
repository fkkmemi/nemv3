var express = require('express');
var createError = require('http-errors');
var router = express.Router();

const us = [
  {
    name: '김김김',
    age: 14
  },
  {
    name: '이이이',
    age: 24
  }
]

router.get('/', function(req, res, next) {
  console.log(req.query)
    console.log(req.body)

  res.send({ users: us })
});

router.post('/', (req, res, next) => {
  console.log(req.query)
    console.log(req.body)
  res.send({ success: true, msg: 'post ok' })
})

router.put('/', (req, res, next) => {
  console.log(req.query)
    console.log(req.body)
  res.send({ success: true, msg: 'put ok' })
})

router.delete('/', (req, res, next) => {
  console.log(req.query)
    console.log(req.body)
  res.send({ success: true, msg: 'del ok' })
})


router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
