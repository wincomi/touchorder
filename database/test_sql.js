const sql = require('./query/login');
const order = require('./query/order');

var getUserData = (async (phone_number) => {
    var data = await sql.getUserId(phone_number)
    var key = data[Object.keys(data)[0]];
    
    var name = await sql.getUserName(key)
    
    console.log(name[0])
});

getUserData("010-666-7777")

// var getMenuData = (async (store_id) => {
//     var data = await order.menuList(store_id)
        
//     console.log(data[0]) 
//     console.log(data[1]) 
//     console.log(data[2]) 

// });

// getMenuData(1);