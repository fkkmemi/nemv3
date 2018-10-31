# nemv3
node express mongo vue

## config 파일 세팅 방법

**config/index.js**  
```javascript
module.exports = {
  dbUrl: 'mongodb://localhost:27017/nemv',
  admin: {
    id: 'admin',
    pwd: '1234',
    name: '관리자'
  },
  secretKey: '아주 어려운 토큰 발급용 키'
}
```

이런식으로 디비 연결 문자열을 작성해야 웹서버가 정상 구동됨.
