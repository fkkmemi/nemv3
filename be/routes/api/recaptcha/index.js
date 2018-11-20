const router = require('express').Router()
const createError = require('http-errors')
const axios = require('axios')

router.post('/', (req, res, next) => {
  const { secret, response } = req.body
  const bd = {
    secret,
    response,
    remoteip: req.ip
  }
  const hd = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
  }
  axios.post('https://www.google.com/recaptcha/api/siteverify', bd, hd)
    .then(r => {
      if (!r) throw new Error('데이터 없음')
      res.send({ success: true, d: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
