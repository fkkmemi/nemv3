const router = require('express').Router()
const createError = require('http-errors')
const Board = require('../../../models/boards')

router.all('*', function(req, res, next) {
  // if (req.user.lv) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

router.get('/read/:name', (req, res, next) => {
  const name = req.params.name
  Board.findOne({ name })
    .then(r => {
      // 권한으로 못보게 하려면..
      // if (r.lv < req.lv) throw new Error(`${name} 게시판을 볼 수 있는 자격이 없습니다.`)
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.get('/list', (req, res, next) => {
  Board.find().sort({ lv: -1 })
    .then(rs => {
      res.send({ success: true, ds: rs, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
