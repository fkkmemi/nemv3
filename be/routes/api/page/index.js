var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../models/pages')

router.post('/', function(req, res, next) {
  if (!req.user) res.send({ success: true, d: { id: '손님', name: '손님', lv: 3 } })
  const { to } = req.body
  Page.findOne({ name: to })
    .then((r) => {
      if (!r) return Page.create({ name: to })
      if (req.user.lv > r.lv) throw new Error(`${to} 페이지 이용 자격이 없습니다.`)
      return Promise.resolve(r)
    })
    .then((r) => {
      res.send({ success: true, d: req.user })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
