const sql = require('../exe_sql')

/*
    주문 과정
    1.가게 리스트에서 가게 선택
    2.메뉴에서 장바구니로 저장
    3.주문 -> 판매자 페이지 전달
*/


//가게 리스트 가져오기 + 평점순으로 정렬
async function storeList(){
    var db_query = 'SELECT s.name,s.content,s.phone,s.address, ifnull(round(avg(r.rating),1), 0) as store_rating FROM store as s JOIN review as r where s.store_id = r.store_id group by s.store_id;'
    const result = await sql.execute(db_query,Null)
    return result
}

async function menuList(store_id){
    var db_query = 'SELECT * FROM menu WHERE store_id = ?'
    const result  = await sql.execute(db_query,store_id)
}

async function order(){
    var db_query = 'INSERT INTO user_order VALUES '
    const result = await sql.execute(db_query,Null)
    return 
}

module.exports.storeList = storeList
module.exports.menuList = menuList
module.exports.order = order