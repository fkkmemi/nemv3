var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback')
const cors = require('cors')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// console.log(path.join(__dirname, '../', 'fe', 'dist'))
if (process.env.NODE_ENV !== 'production') app.use(cors())
app.use('/api', require('./routes/api'))
app.use(history())
app.use(express.static(path.join(__dirname, '../', 'fe', 'dist')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ msg: err.message })
  console.error(err.message)
});

const mongoose = require('mongoose')

console.log(`${process.env.NODE_ENV} started!`)


const cfg = require('../config')

mongoose.connect(cfg.dbUrl, { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')
  // User.deleteMany()
  // .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.create({ name: '하하' })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))
  // User.find()
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

  // User.updateOne({ _id: '5bbe038d7588bf14393d08bf' }, { $set: { age: 34 } })
  //   .then(r => {
  //     console.log(r)
  //       console.log('updated')
  //     return User.find()
  //   })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))
  // User.deleteOne({ name: '하하' })
  //   .then(r => console.log(r))
  //   .catch(e => console.error(e))

})


module.exports = app;

var jwt = require('jsonwebtoken');
const key = '베리베리어려운키'
// var token = jwt.sign({ id: 'memi', email: 'memi@xxx.com' }, key);
// console.log(token)
//
// jwt.verify(token, 'ㄴㄹㅈㄷㄹ', (err, r) => {
//   if (err) return console.error(err.message)
//   console.log(r) // bar
//   console.log(new Date(r.iat * 1000).toLocaleString())
// })


// console.log(jwt.sign({ id: 'memi' }, 'abcd'))
// console.log('헬로?')
// jwt.sign({ id: 'memi'}, 'key', (err, token) => {
//   console.log(token)
// })
// console.log('헬로?')

// User.findOne({}, (err, r) => {
//   if (err) return console.error(err)
//   console.log(r)
// })
// User.findOne({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))


// 콜백
// User.findOne({ name: 'aaa'}, (err, u) => {
//   if (err) return console.error(err.message)
//   if (!u) {
//     console.log(u) // null
//     User.create({ name: 'aaa', age: 10 }, (err, cu) => {
//       if (err) return console.error(err.message)
//       console.log(cu) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//       jwt.sign({ name: cu.name, age: cu.age}, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 10, iat: 1540888948 }
//         })
//       })
//     })
//   }
//   else {
//     console.log(u) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//     const user = u
//     User.updateOne({ _id: u._id }, { $inc: { age: 1 }}, (err, ur) => {
//       if (err) return console.error(err.message)
//       console.log(ur) // { n: 1, nModified: 1, ... }
//       jwt.sign({ name: user.name, age: user.age + 1 }, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 11, iat: 1540889007 }
//         })
//       })
//     })
//   }
// })

// User.deleteMany({})
//   .then(r => console.log(r))
//   .catch(err => console.error(err))

// const signToken = (u, k) => {
//   return new Promise((resolve, reject) => {
//     jwt.sign({ name: u.name, age: u.age }, k, (err, token) => {
//       if (err) reject(err)
//       resolve(token)
//     })
//   })
// }
// const verifyToken = (t, k) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(t, k, (err, v) => {
//       if (err) reject(err)
//       resolve(v)
//     })
//   })
// }

// 프라미스
// let user
// User.findOne({ name: 'aaa' })
//   .then((u) => {
//     if (!u) return User.create({ name: 'aaa', age: 10 })
//     return Promise.resolve(u)
//   })
//   .then((u) => {
//     user = u
//     return User.updateOne({ _id: u._id }, { $inc: { age: 1 }})
//   })
//   .then((r) => {
//     if (!r.nModified) throw new Error('수정된 것이 없네요..')
//     user.age++
//     return signToken(user, key)
//   })
//   .then((token) => {
//     return verifyToken(token, key)
//   })
//   .then(v => console.log(v))
//   .catch((err) => {
//     console.error(err.message)
//   })

// 어씽크 테스트

// const asyncTest = async (i) => {
//   if (i > 10) throw new Error('10보다 큰건 싫어요')
//   return i + 2
// }
//
// asyncTest(1)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))
//
// asyncTest(11)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))

// 어씽크

// const getToken = async (name) => {
//   let u = await User.findOne({ name }) // name: name을 축약하고 await로 기다려 줍니다.
//   if (!u) u = await User.create({ name , age: 10 }) // 만들어주고 u를 갱신 합니다.
//   if (u.age > 12) throw new Error(`${u.age}는 나이가 너무 많습니다.`)
//   const ur = await User.updateOne({ _id: u._id }, { $inc: { age: 1 }}) // age를 증가시키고 ur(user result)에 결과값을 담아놓습니다.
//   if (!ur.nModified) throw new Error('수정된 것이 없네요..') // 수정된 값이 없다면 에러와 함께 내보냅니다.
//   u = await User.findOne({ _id: u._id }) // age가 증가 된 것으로 갱신해줍니다.
//   const token = await signToken(u, key) // 받아 두었던 u로 토큰을 만듭니다.
//   const v = await verifyToken(token, key)
//   return v
// }
//
// getToken('aaa')
//   .then(v => console.log(v))
//   .catch(err => console.error(err.message))

// const crypto = require('crypto');
// const bf = Buffer.alloc(64)
// const s = crypto.randomFillSync(bf)
// console.log(s.toString('hex'))

// const moment = require('moment')

// moment.locale('ko')
//
// console.log(moment().fromNow())
// console.log(moment().add(-5, 'hours').fromNow())
// console.log(moment().add(5, 'hours').fromNow())
//
// moment.locale('ko')
// console.log(moment().fromNow())
// console.log(moment().add(-40, 'hours').fromNow())
// console.log(moment().add(10, 'hours').fromNow())

// const ct = moment() // 현재시간
// const bt = moment().add(-1, 'hours') // 한시간전
//
// console.log(ct.diff(bt))
// console.log(ct.diff(bt,'seconds'))
//
// console.log(bt.diff(ct))
// console.log(bt.diff(ct,'seconds'))


// const User = require('./models/users')
// const Board = require('./models/boards')
// const Article = require('./models/articles')

// User.findOne()
//   .then(r => console.log(r.id, r._id)) // 5be1c7eb0ff40640c81ecc0d
//
//
// Board.findOne()
//   .then(r => console.log(r.name, r._id)) // 5be97f5f8fb2da704ad95273

// Article.create({ title: 'aaa', content: 'kkfjf', _user: '5be1c7eb0ff40640c81ecc0d', _board: '5be97f5f8fb2da704ad95273' })
//   .then(r => console.log(r))


// Article.find({ _board: '5be97f5f8fb2da704ad95273'})
//   .populate('_user', 'name')
//   .populate('_board')
//   .then(r => console.log(r))
