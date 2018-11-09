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
    subject: 'user-token',
    algorithm: 'HS256',    
    expiresIn: 60 * 3, // 기본 3분
    expiresInRemember: 60 * 60 * 24 * 7 // 기억하기 눌렀을 때 7일
    expiresInDiv: 3, // 토큰시간 나누는 기준
  }
}
```

- dbUrl: 데이터베이스 주소
- admin: 최초 웹 구동시 생성될 관리자

토큰 만들 때 필요한 정보를 추가합니다.

- jwt.secretKey: secretKey -> jwt.secretKey
- jwt.issuer: 만든 사람, 서버
- jwt.subject: 토큰 이름
- jwt.algorithm: 암호화 10개중 고르면 됨

| alg Parameter Value | Digital Signature or MAC Algorithm |
| --- | --- |
|HS256 | HMAC using SHA-256 hash algorithm |
|HS384 |	HMAC using SHA-384 hash algorithm|
|HS512 |	HMAC using SHA-512 hash algorithm|
|RS256 |	RSASSA using SHA-256 hash algorithm|
|RS384 |	RSASSA using SHA-384 hash algorithm|
|RS512 |	RSASSA using SHA-512 hash algorithm|
|ES256 |	ECDSA using P-256 curve and SHA-256 hash algorithm|
|ES384 |	ECDSA using P-384 curve and SHA-384 hash algorithm|
|ES512 |	ECDSA using P-521 curve and SHA-512 hash algorithm|
|none |	No digital signature or MAC value included|

참고: [https://www.npmjs.com/package/jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

토큰을 만들때 다른 정보를 추가했으니 해독이 더 어려워 지겠죠?

- jwt.expiresIn: 기억히기 안 누른 토큰 시간(3분)
- jwt.expiresInRemember: 기억하기 누른 토큰 시간(6일)
- jwt.expiresInDiv: 토큰 시간 나눈 시간(1분 혹은 2일), 토큰 재발급 할때 쓰일 시간입니다.
