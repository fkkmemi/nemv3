const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const pageSchema = new mongoose.Schema({
  name: { type: String, default: '', index: true },
  title: { type: String, default: '' },
  inCnt: { type: Number, default: 0 },
  lv: { type: Number, default: 0 }
})

module.exports = mongoose.model('Page', pageSchema)
