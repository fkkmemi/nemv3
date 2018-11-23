const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.send({ success: true })
})

module.exports = router
