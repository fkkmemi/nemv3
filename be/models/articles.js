const mongoose = require('mongoose')
const cfg = require('../../config')

mongoose.set('useCreateIndex', true)
const articleSchema = new mongoose.Schema({
  title: { type: String, default: '', index: true },
  content: { type: String, default: '' },
  cnt: {
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 }
  },
  ip: { type: String, default: '' },
  comments: [],
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
})

module.exports = mongoose.model('Article', articleSchema)
