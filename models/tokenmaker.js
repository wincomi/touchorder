require("dotenv").config();
const http = require('http');
const jwt=require('jsonwebtoken')
const bodyParser = require("body-parser");
const dblog = require('../database/query/login');


const Token = {}
// access token
Token.generateAccessToken = (word)=>{
    return jwt.sign({ word }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
};

// refersh token
Token.generateRefreshToken = (word)=>{
    return jwt.sign({ word }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "120m" });
};

/*
// access token의 유효성 검사
Token.checkAccessToken = (req, res, cbfn)=>{
    let authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        console.log("wrong token format or token is not sended");
        return res.sendStatus(400);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        req.user = user;
        cbfn();
    });
};
*/

Token.findByToken = (token, cbfn)=>{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (error) return res.sendStatus(403);
        //decoded된 user_id로 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        let dbtoken=dblog.getToken(decoded)
        console.log(dbtoken)
        if(token!=dbtoken) { //액세스 토큰이 아니면 리프레시 토큰으로 체크 <=최적화 필요
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
                if (error) return res.sendStatus(403);
                let dbtoken2=dblog.getToken(decoded)
                console.log(dbtoken2)
                if(token!=dbtoken2) return cbfn(false, null)
                return cbfn(true, decoded)
            })
        }
        return cbfn(true, decoded)
    })
}

Token.refreshByToken = (token, cbfn)=>{
    //토큰을 decode한다
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if (error) return res.sendStatus(403);
        //decoded된 user_id로 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        let dbtoken=dblog.getToken(decoded)
        console.log(dbtoken)
        if(token!=dbtoken) { //액세스 토큰이 아니면 리프레시 토큰으로 체크 <=최적화 필요
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded)=>{
                if (error) return res.sendStatus(403);
                let dbtoken2=dblog.getToken(decoded)
                console.log(dbtoken2)
                if(token!=dbtoken2) return cbfn(false, null)
                dbtoken2=this.generateRefreshToken(err, decoded)
                return cbfn(true, dbtoken2)
            })
        }
        dbtoken=this.generateRefreshToken(err, decoded)
        return cbfn(true, dbtoken)
    })
}

module.exports = {Token}