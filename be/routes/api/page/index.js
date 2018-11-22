const router = require('express').Router()
const createError = require('http-errors')
const Page = require('../../../models/pages')

router.post('/', function(req, res, next) {
  // return res.send({ success: true, d: req.user })
  // throw createError(403, 'hhhh')
  const { name } = req.body
  Page.findOne({ name })
    .then((r) => {
      if (!r) {
        if (req.user.lv) throw new Error(`페이지 ${name} 생성이 안되었습니다`)
        return Page.create({ name, title: name })
      }
      if (r.lv < req.user.lv) throw new Error(`페이지 ${name} 이용 자격이 없습니다.`)
      return Page.updateOne({ _id: r._id }, { $inc: { inCnt: 1 } })
    })
    .then(() => {
    //   return Page.find()
    // })
    // .then((rs) => {
    //   console.log(rs)
      res.send({ success: true, d: req.user, token: req.token })
    })
    .catch(e => next(createError(403, e.message)))
});

module.exports = router;
