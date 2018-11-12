const mongoose = require('mongoose')

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
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  _board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', index: true }
})

module.exports = mongoose.model('Article', articleSchema)
