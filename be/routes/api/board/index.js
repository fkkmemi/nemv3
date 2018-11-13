var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')

router.all('*', function(req, res, next) {
  // if (req.user.lv) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

router.get('/:name', (req, res, next) => {
  const name = req.params.name
  Board.findOne({ name })
    .then(r => {
      // 권한으로 못보게 하려면..
      // if (r.lv < req.lv) return res.send({ success: false, msg: `${name} 게시판을 볼 수 있는 자격이 없습니다.`})
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
});

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
