const SMS_Cache = require('memory-cache');  // 인증번호 임시 저장용
const send = require('./naver_sms');

// 인증번호 생성
function create_verificationCode() {
  const verificationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  console.log("인증 번호 생성 : ", verificationCode);
  return verificationCode.toString();
}

// 인증 번호 요청
function request_verificationCode(phoneNumber) {
  const verificationCode = create_verificationCode();
  SMS_Cache.del(phoneNumber);
  //send(phoneNumber, verificationCode);
  SMS_Cache.put(phoneNumber, verificationCode);
}

// 인증 번호 확인
function validate_verificationCode(phoneNumber, verificationCode) {
  const CacheData = SMS_Cache.get(phoneNumber);

  if (!CacheData) {
    return false;
  } else if (CacheData !== verificationCode) {
    return false;
  } else {
    SMS_Cache.del(phoneNumber);
    return true
  }
};


module.exports = {
  create_verificationCode,
  request_verificationCode,
  validate_verificationCode
};
