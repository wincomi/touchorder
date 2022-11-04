const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();
const port = 8080;
const dblog = require('./database/query/login');
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());
const {Token} = require("./models/tokenmaker")
const {auth} = require("./models/auth")
require('dotenv').config({path:"./models/.env"});
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

//액세스토큰 발급
app.post('/login', async(req, res) => { //req:phone_number, res:cookie(AccessToken)
    //if(!req.body.phone_number){
    //    res.send('<script type="text/javascript">alert("phone_number를 입력하세요!"); document.location.href="/login";</script>')
    //    res.end()
    //}

    //db에 phone_number가 있는지 확인후 user_id 들고옴
    let phone_number = req.body.phone_number.toString();
    let user_id = await dblog.getUserId(phone_number)
    console.log(user_id[0])
    if (!user_id) { //후에 user_id가 null이 아닌지 확인(회원인지 확인)
        let token=Token.generateAccessToken(user_id)
        //if(err) return res.status(400).send(err) //Bad Request
        //쿠키에 토큰 저장
        res.cookie("touch_tok", token).status(200).json({loginSuccess:true})
        //db에도 토큰 저장
        await dblog.insertToken(user_id, token)
        res.redirect('/') //로그인하고나면 메인 페이지로 넘기기. 링크 수정 필요
        res.end()
    } else {        
        res.send('<script type="text/javascript">alert("회원이 아닙니다."); document.location.href="/login";</script>')
        res.end() //이거 실행되나?
    }
});

// 리프레시 토큰 발급, 리프레시는 2시간정도 지속되는 토큰
// 리프레시 토큰 작업중
app.post("/refresh", (req, res) => { //req:cookie(AccessToken) res:cookie(RefreshToken)
    let token = req.cookies.touch_tok
    let phone_number = req.body.phone_number
    Token.refreshByToken(token, phone_number, (bool, Rtoken)=>{
        if(!bool) {
            res.send('<script type="text/javascript">alert("Rtoken failed"); document.location.href="/login";</script>')
            res.end()
        }
        res.cookie("touch_tok", Rtoken).status(200).json({refreshSuccess:true})
        dblog.insertToken(Rtoken)
        res.redirect('/') //토큰 재발급 후 기존 페이지로 넘기기, 링크 수정 필요
        res.end()
    })
});

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
app.get('/logout', (req, res) => {
    let token = req.cookies.touch_tok
    Token.findByToken(token, (bool, user_id)=>{
        if(!bool){
            res.send('<script type="text/javascript">alert("logout failed"); document.location.href="/";</script>');    
            res.end();
        }
        dblog.delToken(user_id)
    })
    res.send('<script type="text/javascript">alert("성공적으로 로그아웃 되었습니다."); document.location.href="/";</script>');    
    res.end();
  });


app.listen(port, () => {
    console.log('http://localhost:'+ port);
});