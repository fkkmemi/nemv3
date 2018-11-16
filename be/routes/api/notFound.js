const createError = require('http-errors')

module.exports = (req, res, next) => {
  next(createError(404, `${req.path} not found`))
}
