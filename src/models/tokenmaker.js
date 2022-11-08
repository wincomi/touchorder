require("dotenv").config();
const http = require('http');
const jwt=require('jsonwebtoken')
const bodyParser = require("body-parser");
const dblog = require('../database/query/login');
const { nextTick } = require("process");


const Token = {}
// access token
Token.generateAccessToken = (word)=>{
    return jwt.sign({ word }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20m" });
};

// refersh token
Token.generateRefreshToken = (word)=>{
    return jwt.sign({ word }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "120m" });
};


Token.findByToken = async(token, cbfn)=>{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        if (err){
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, decoded)=>{
                if (err) return cbfn(err, null);
                decoded=decoded.word
                let dbtoken2=await dblog.getToken(decoded)
                if(token!=dbtoken2[0].token) return cbfn(err, null)
                return cbfn(null, decoded)
            })
        }else {
            console.log("응애")
            decoded=decoded.word
            let dbtoken=await dblog.getToken(decoded)
            if(token!=dbtoken[0].token) return cbfn(err, null)
            return cbfn(null, decoded)
        }
    })
}

Token.refreshByToken = async(token, cbfn)=>{
    //토큰을 decode한다
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async(err, decoded)=>{
        if(err){
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, decoded)=>{
                if (err) return cbfn(err, null);
                decoded=decoded.word
                let dbtoken2=await dblog.getToken(decoded)
                if(token!=dbtoken2[0].token) return cbfn(err, null)
                dbtoken2=Token.generateRefreshToken(decoded)
                return cbfn(null, dbtoken2)
            })
        } else {
            decoded=decoded.word
            let dbtoken=await dblog.getToken(decoded)
            if(token!=dbtoken[0].token) return cbfn(err, null)
            dbtoken=Token.generateRefreshToken(decoded)
            return cbfn(null, dbtoken)
        }
    })
}

module.exports = {Token}