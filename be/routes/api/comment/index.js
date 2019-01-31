const router = require('express').Router()
const createError = require('http-errors')
const request = require('request')
const Board = require('../../../models/boards')
const Article = require('../../../models/articles')
const Comment = require('../../../models/comments')
const cfg = require('../../../../config')

router.post('/:_article', (req, res, next) => {
  const _article = req.params._article
  if (!_article) throw createError(400, '게시물이 선택되지 않았습니다')
  const { content, response } = req.body

  if (!content) throw createError(400, '내용이 없습니다')
  if (!response) throw createError(400, '로봇 검증이 없습니다')

  const ro = {
    uri: 'https://www.google.com/recaptcha/api/siteverify',
    json: true,
    form: {
      secret: cfg.recaptchaSecretKey,
      response,
      remoteip: req.ip
    }
  }
  request.post(ro, (err, response, body) => {
    if (err) throw createError(401, '로봇 검증 실패입니다')

    Article.findById(_article)
      .then(r => {
        if (!r) throw createError(400, '잘못된 게시물입니다')
        // if (r.lv < req.user.lv) throw createError(403, '권한이 없습니다')
        const cmt = {
          content,
          _article,
          ip: '1.1.1.1',//req.ip,
          _user: null
        }
        if (req.user._id) cmt._user = req.user._id
        return Comment.create(cmt)
      })
      .then(r => {
        if (!r) throw new Error('게시물이 생성되지 않았습니다')
        res.send({ success: true, d: r, token: req.token })
      })
      .catch(e => {
        res.send({ success: false, msg: e.message })
      })
  })
})


router.put('/:_id', (req, res, next) => {
  if (!req.user._id) throw createError(403, '댓글 수정 권한이 없습니다')
  const _id = req.params._id

  const { content } = req.body

  if (!content) throw createError(400, '내용이 없습니다')

  Comment.findById(_id)
    .then(r => {
      if (!r) throw new Error('댓글 존재하지 않습니다')
      if (!r._user) throw new Error('손님 댓글 수정이 안됩니다')
      if (r._user.toString() !== req.user._id) throw new Error('본인이 작성한 댓글이 아닙니다')
      return Comment.findByIdAndUpdate(_id, { $set: { content } }, { new: true }).populate('_user')
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

router.delete('/:_id', (req, res, next) => {
  if (!req.user._id) throw createError(403, '댓글 삭제 권한이 없습니다')
  const _id = req.params._id

  Comment.findById(_id).populate('_user', 'lv')
    .then(r => {
      if (!r) throw new Error('댓글이 존재하지 않습니다')
      if (!r._user) {
        if (req.user.lv > 0) throw new Error('손님 댓글은 삭제가 안됩니다')
      }
      else {
        if (r._user._id.toString() !== req.user._id) {
          if (r._user.lv < req.user.lv) throw new Error('본인이 작성한 댓글이 아닙니다')
        }
      }
      return Comment.deleteOne({ _id })
    })
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
