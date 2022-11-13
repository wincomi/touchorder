const sql = require('../exe_sql')

async function getAllReview(){
    var db_query = "SELECT * FROM review"
    const result = await sql.execute(db_query,null)
    return result
}

module.exports.getAllReview = getAllReview