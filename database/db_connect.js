/*
 # Database 연결 모듈

 ## 사용법
 const db = require('./db_connect');
 const connection = db.init();
 db.getConnection(connection);
 connection.query(...)
 db.end(connection);  
*/

const mysql = require('mysql');
const config = require('./db_config');

function init() {
  console.log(config.host);
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });
}

function getConnection(con) {
  con.connect();
}

function end(con) {
  con.end();
}

module.exports.init = init;
module.exports.getConnection = getConnection;
module.exports.end = end;
