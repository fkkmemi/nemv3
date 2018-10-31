var express = require('express');
var createError = require('http-errors');
var router = express.Router();

router.post('/in', (req, res) => {
  const { id, pwd } = req.body
  if (!id) return res.send({ success: false, msg: '아이디가 없습니다.'})
  if (!pwd) return res.send({ success: false, msg: '비밀번호가 없습니다.'})

  res.send({ success: true })
})

router.post('/out', (req, res) => {
  res.send({ success: false, msg: '아직 준비 안됨.'})
})

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
