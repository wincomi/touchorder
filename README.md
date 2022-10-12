# 터치오더

## 시작 전
1. `npm install`
2. 데이터베이스 접속 정보 파일 `db_config.js` 생성 (하단 참고)

### 데이터베이스 접속 정보 (db_config.js)
사용할 데이터베이스 접속 정보를 `database/db_config.js` 파일에 아래 코드와 같이 생성

```js
/*
  # Database 접속 정보
*/

module.exports = function() {
    return {
        host: "localhost",
        user: "user",
        password: "password",
        database: "database"
    }
}();
```