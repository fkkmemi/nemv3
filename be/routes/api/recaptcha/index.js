const router = require('express').Router()
const createError = require('http-errors')
const request = require('request')
const axios = require('axios')

router.post('/', (req, res, next) => {
  const { response } = req.body
  const bd = {
    secret: '6LduGnwUAAAAADyz5jeyu6g8BuxStV6z-Wo_jICd',
    response,
    remoteip: req.ip
  }
  // const hd = {
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
  //   }
  // }
  axios.post('https://www.google.com/recaptcha/api/siteverify', bd)
    .then(r => {
      if (!r) throw new Error('데이터 없음')
      res.send({ success: true, d: r })
    })
    .catch(e => {
      res.send({ success: false, msg: e.message })
    })

  // const verifyCaptchaOptions = {
  //       uri: "https://www.google.com/recaptcha/api/siteverify",
  //       json: true,
  //       form: {
  //           secret: '6LduGnwUAAAAADyz5jeyu6g8BuxStV6z-Wo_jICd',
  //           response: response
  //       }
  //   };
  //
  //   request.post(verifyCaptchaOptions, function (err, response, body) {
  //           if (err) {
  //               return res.status(500).json({message: "oops, something went wrong on our side"});
  //           }
  //
  //           if (!body.success) {
  //               return res.status(500).json({message: body["error-codes"].join(".")});
  //           }
  //           console.log(response)
  //
  //           //Save the user to the database. At this point they have been verified.
  //           res.status(201).json({message: "Congratulations! We think you are human."});
  //       }
  //   );
})

module.exports = router;
