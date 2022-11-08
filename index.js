const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const port = 8080;
const dblog = require('./src/database/query/login');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());
const {Token} = require("./src/models/tokenmaker")
const {auth} = require("./src/models/auth")
require('dotenv').config({path:"./src/models/.env"});
//bcrypt 필요없음


app.get('/', (req, res) => {
    res.send('Hello World!')
})



//로그인 1104 최진호
//회원가입 코드(윤재민), 액세스토큰 발급, 리프레시토큰 발급 순서대로 구현

//회원가입 코드
app.get('/authent', (req, res) => {
    //휴대폰 인증 코드
    res.redirect('/login') //인증이 끝나면 로그인 페이지로 가서 액세스토큰 발급받음
    res.end()
});
const path = require('path');

// 문자 관련
const SMS = require('./src/sms');

// DB
const db = require('./src/database/db_connect');


app.listen(port, function() {
    console.log('http://localhost:' + port);
});

//액세스토큰 발급
app.post('/login', async(req, res) => { //req:phone_number, res:cookie(AccessToken)
    //db에 phone_number가 있는지 확인후 user_id 들고옴
    let phone_number = req.body.phone_number.toString();
    let user_id = await dblog.getUserId(phone_number)
    if (user_id!==null) { //후에 user_id가 null이 아닌지 확인(회원인지 확인)
        let token=Token.generateAccessToken(user_id)
        //if(err) return res.status(400).send(err) //Bad Request
        //클라이언트측 쿠키에 토큰 저장
        res.cookie("touch_tok", token).status(200).json({loginSuccess:true})
        //db에도 토큰 저장
        await dblog.insertToken(user_id, token)
        //res.redirect('/') //로그인하고나면 메인 페이지로 넘기기. 링크 수정 필요 - 테스트할때 오류나니 주석처리함
        res.end()
    } else {
        res.send('<script type="text/javascript">alert("회원이 아닙니다."); document.location.href="/login";</script>')
        res.end()
    }
});

// 리프레시 토큰 발급, 리프레시는 2시간정도 지속되는 토큰
app.post("/refresh", async(req, res) => { //req:cookie(AccessToken) res:cookie(RefreshToken)
    let token = req.cookies.touch_tok
    let phone_number = req.body.phone_number
    await Token.refreshByToken(token, async(err, Rtoken)=>{
        if(err) {
            res.status(403).json({refreshSuccess:false})
            return;
        }
        let user_id = await dblog.getUserId(phone_number)
        res.cookie("touch_tok", Rtoken).status(200).json({refreshSuccess:true})
        await dblog.insertToken(user_id, Rtoken)
        //res.redirect('/') //토큰 재발급 후 기존 페이지로 넘기기, 링크 수정 필요
        res.end()
    })
});
//나중에 쓸 코드
app.get('/auth', auth , (req, res)=>{//auth는 미들웨어
    //미들웨어를 통과했다 = Authentication이 True라는 말
    //클라이언트에 true라는 정보 전달
    res.status(200).json({
      _id: req.user_id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
    })
})

// 로그아웃
app.post('/logout', async(req, res) => {
    let token = req.cookies.touch_tok
    await Token.findByToken(token, async(err, user_id)=>{
        if(err){
            res.status(403).json({refreshSuccess:false})
            return;
        }
        await dblog.delToken(user_id)
    })
    res.cookie("touch_tok", "").status(200).json({logoutSuccess:true})  
    res.end();
  });

// 회원 가입
app.post('/sign-up', function(req, res){
    const connection = db.init();

    phoneNumber = req.body.phoneNumber;
    userName = req.body.userName;

    let query = `INSERT INTO user(phone_number, user_name) VALUES('${phoneNumber}', '${userName}');`;
    console.log(query);
    db.getConnection(connection);
    connection.query(query)
    db.end(connection);  

    res.send("회원 가입 완료"); 
})

// 인증 번호 요청 - url 경로 추후 변경
app.post('/request-verification-code', function(req, res) {
    phoneNumber = req.body.phoneNumber;
    SMS.request_verificationCode(phoneNumber);
    res.send("인증 번호 발급 완료");
});


// 인증 확인 - url 경로 추후 변경
app.post('/validate-verification-code', function(req, res) {
    phoneNumber = req.body.phoneNumber;
    verificationCode = req.body.verificationCode;
    console.log("휴대폰 번호 = " + phoneNumber);
    console.log("인증 번호 = " + verificationCode);

    var result = SMS.validate_verificationCode(phoneNumber, verificationCode);
    if (result) {
        res.send("인증 성공");
    }
    else {
        res.send("인증 실패");
    }
});