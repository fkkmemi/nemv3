const router = require('express').Router()
const createError = require('http-errors')
const Site = require('../../../models/sites')

router.get('/', (req, res, next) => {
  // return res.send({ success: true, d: req.user })
  Site.findOne({})
    .then(r => {
      res.send({ success: true, d: r, token: req.token })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })
})

module.exports = router;
