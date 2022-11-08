const sql = require('../exe_sql')

//회원정보 입력
async function insertUser(phone_number){
    var db_query = "INSERT INTO user (phone_number) values (?)"
    const result = await sql.execute(db_query,[phone_number])
    return 
}

//회원 이름 변경 -초기 상태'뉴비'
async function renameUser(user_id){
    var db_query = "UPDATE user SET user_name WHERE user_id = ?"
    const result = await sql.execute(db_query,[user_id])
    return 
}

//유저 가게 추가
async function enrollStore(user_id,store_id){
    var db_query = "UPDATE user SET store_id = ?,is_admin = 1 WHERE user_id = ?"
    const result = await sql.execute(db_query,[store_id,user_id])
    return 
}

//유저 정보 조회
async function getUser(user_id){
    var db_query = "SELECT * FROM user WHERE user_id = ?"
    const result = await sql.execute(db_query,[user_id])
    return result
}

//폰번호로 유저ID 가져오기
async function getUserId(phone_number){
    var db_query = "SELECT user_id FROM user WHERE phone_number = ?"
    const result = await sql.execute(db_query,[phone_number])
    return result[0].user_id
}

async function getUserName(user_id){
    var db_query = "SELECT user_name FROM user WHERE user_id = ?"
    const result = await sql.execute(db_query,[user_id])
    return result[0].user_name
}

//TOKEN 갱신 
async function insertToken(user_id, token){
    var db_query = "UPDATE user SET token = ? WHERE user_id = ?"
    const result = await sql.execute(db_query,[token,user_id])
    return result
}

//TOKEN 삭제 
async function delToken(user_id){
    var token =null
    putToken(user_id,token)
    return;
}

module.exports.insertUser = insertUser
module.exports.renameUser = renameUser
module.exports.enrollStore = enrollStore
module.exports.getUser = getUser
module.exports.getUserId = getUserId
module.exports.getUserName = getUserName
module.exports.insertToken = insertToken
module.exports.delToken = delToken