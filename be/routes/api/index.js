var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.use('/sign', require('./sign'))
router.all('*', function(req, res, next) {
  // 토큰 검사
  next()
});
router.use('/check', require('./check'))
router.use('/test', require('./test'))
router.use('/user', require('./user'))

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
