const sql = require('../exe_sql')


//폰번호로 유저ID 가져오기
async function getUser(phone_number){
    var db_query = "SELECT user_id FROM user WHERE phone_number = ?"
    const result = await sql.execute(db_query,phone_number)
    return result
}

//TOKEN 갱신 --실험 필요
async function putToken(user_id, token){
    var db_query = "UPDATE user SET token = "+token+" WHERE user_id = ?"
    const result = await sql.execute(db_query,user_id)
    return result
}

//TOKEN 삭제 
async function delToken(user_id){
    var token =''
    const result = await sql.execute(user_id,token)
    return;
}

module.exports.getUser = getUser
module.exports.putToken = putToken
module.exports.delToken = delToken