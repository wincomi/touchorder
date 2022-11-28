
// 참고 코드
// https://jae04099.tistory.com/entry/Nodejs-%EB%84%A4%EC%9D%B4%EB%B2%84-%EB%AC%B8%EC%9E%90-%EC%A0%84%EC%86%A1-API-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0feat-axios
// https://happylulurara.tistory.com/197

// 공식 api 설명
// https://api.ncloud-docs.com/docs/ai-application-service-sens-smsv2
require("dotenv").config();

const axios = require('axios');
const request = require('request');
const CryptoJS = require('crypto-js');
const finErrCode = 404;

// naver sms 인증 관련 api 키
const NCP_serviceID = process.env.NCP_SERVICE_ID;
const NCP_accessKey = process.env.NCP_ACCESS_KEY;
const NCP_secretKey = process.env.NCP_SECRET_KEY;
const senderNumber  = process.env.SENDER_NUMBER;

const date = Date.now().toString();
const secretKey = NCP_secretKey;
const accessKey = NCP_accessKey;

// url 관련 코드
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${NCP_serviceID}/messages`;
const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;

// HMAC(Hash-based Message Authentication Code)`
const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

function send(phoneNumber, verificationCode) {
    axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": accessKey,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: senderNumber,
            content: `[본인 확인] 인증번호 [${verificationCode}]를 입력해주세요.`,
            messages: [
                { to: `${phoneNumber}`, },],
        },
    }).then(res => {
        console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return finErrCode;
};

  module.exports = send;