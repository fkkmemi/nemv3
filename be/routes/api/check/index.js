var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.all('*', function(req, res, next) {


  next()
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
