const { user } = require("../database/db_config")
const { Token } = require("./tokenmaker")

let auth = (req, res, next) => {
    // 인증 처리를 하는곳
    // 클라이언트 쿠키에서 토큰을 가져온다
    
    let token = req.cookies.touch_tok
    // 토큰을 복호화한 후 user를 찾는다
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (err) throw err 
        // decoded된 user_id로 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        let dbtoken = dblog.getToken(decoded)
        console.log(dbtoken)
        if (token != dbtoken) { // 액세스 토큰이 아니면 리프레시 토큰으로 체크 <=최적화 필요
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (error)
                    return res.sendStatus(403);

                let dbtoken2 = dblog.getToken(decoded)
                console.log(dbtoken2)

                if (token != dbtoken2)
                    return res.js({isAuth: false, error: true})
                next()
            })
        }
        req.token = token
        // req.user=user
        next()
    })

}

module.exports = {auth};
