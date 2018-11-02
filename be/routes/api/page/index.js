var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const Page = require('../../../models/pages')

router.post('/', function(req, res, next) {
  // if (!req.user) return res.send({ success: true, d: { id: '손님', name: '손님', lv: 3 } })
  const { name } = req.body
  // console.log('here')
  // console.log(req.user)
  Page.findOne({ name })
    .then((r) => {
      if (!r) {
        if (req.user.lv) throw new Error(`${name} 페이지 생성이 안되었습니다.`)
        return Page.create({ name })
      }
      if (r.lv < req.user.lv) throw new Error(`${name} 페이지 이용 자격이 없습니다.`)
      return Page.updateOne({ _id: r._id }, { $inc: { viewCnt: 1 } })
    })
    .then(() => {
      return Page.find()
    })
    .then((rs) => {
      console.log(rs)
      res.send({ success: true, d: req.user })
    })
    .catch((e) => {
      res.send({ success: false, msg: e.message })
    })
});
// Page.updateOne({ name: '/' }, { $set: { lv: 3 }})
//   .then((rs) => {
//     console.log(rs)
//   })
//   .catch((e) => {
//     console.error(e.message)
//   })

// Page.find()
//   .then((rs) => {
//     console.log(rs)
//   })
//   .catch((e) => {
//     console.error(e.message)
//   })

router.all('*', function(req, res, next) {
  next(createError(404, '그런 api 없어'));
});

module.exports = router;
