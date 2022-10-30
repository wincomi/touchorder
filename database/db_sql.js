const { user } = require('./db_config');
const db = require('./db_connect');

//폰번호로 유저ID가져오기
async function getUser(phone_number){
    var db_query = "SELECT user_id FROM user WHERE phone_number = ?";
    const result = await execute(db_query,phone_number);
    
    return result;
  }
  //TOKEN 갱신 --이부분 실험 필요
  async function putToken(user_id,token){
    var db_query = "UPDATE user SET token = "+ token +" where user_id = ?";
    const result = await execute(db_query,user_id);
    return;
  }
  //TOKEN 삭제 --이부분 tokenExp 비교 후 삭제에 사용 
  async function delToken(user_id){
    var token = '';
    const result = await putToken(user_id,token);
    return;
  }
  
  //sql문 실행
  async function execute(db_query,opt) {
    return new Promise((resolve, reject) => {
      const connection = db.init();
      db.getConnection(connection);
    
      connection.query(
        db_query,[opt],
        (err, result) => {
          return err ? reject(err) : resolve(result);
        }
      );
      db.end(connection);
    });
  }
  
  module.exports.execute = execute;
  module.exports.getUser = getUser;
  module.exports.putToken = putToken;
  module.exports.delToken = delToken;