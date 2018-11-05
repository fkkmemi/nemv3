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
  jwt: {    
    secretKey: '아주 어려운 토큰 발급용 키',
    issuer: 'xxx.com',
    algorithm: 'HS256'
  }
}
```

- dbUrl: 데이터베이스 주소
- admin: 최초 웹 구동시 생성될 관리자
- secretKey: 토큰 발행과 비밀번호 암호화용
- issuer: 발급자
- algorithm: 암호화 방식
