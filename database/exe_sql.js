const { user } = require('./db_config')
const db = require('./db_connect')

  //sql문 실행
  async function execute(db_query , opt) {
    return new Promise((resolve, reject) => {
      const connection = db.init()
      db.getConnection(connection)
    
      if(opt!=null){
        connection.query(
          db_query,[opt],
          (err, result) => {
            return err ? reject(err) : resolve(result)
          }
        );
      }
      else {
        connection.query(
          db_query,
          (err, result) => {
            return err ? reject(err) : resolve(result)
          }
        );
      }
      db.end(connection)
    });
  }
  
  module.exports.execute = execute