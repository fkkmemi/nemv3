var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', function(req, res, next) {
  console.log(req.headers)
  console.log(req.path)

  if (req.path === '/xxx') return res.send({ status: 'OK' })

  next()
});

router.all('*', (req, res, next) => {
  req.x = '보안 인증 통과'
  next()
})


router.all('*', (req, res, next) => {
  req.x = req.x + ' 2번째 인증 또한 통과'
  next()
})

router.all('*', (req, res, next) => {
  res.send({ status: req.x })
})

router.use('/test', require('./test'))
router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
