# 터치오더

## 시작 전
1. `npm install`
2. 데이터베이스 접속 정보 파일 `db_config.js` 생성 (하단 참고)

### 데이터베이스 접속 정보 (db_config.js)
사용할 데이터베이스 접속 정보를 `database/db_config.js` 파일에 아래 코드와 같이 생성

#### yarn 사용법
1. npm install -g yarn 입력
2. 입력할 때 client 디렉토리 접근해서 yarn install 입력
3. 앞으로는 npm 보다 yarn 쓰는 것을 추천

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
