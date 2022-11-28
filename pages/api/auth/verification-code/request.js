const SMS = require('@libs/auth/sms');

export default (req, res) => {
    if (req.method == 'POST') {
        let phoneNumber = req.body.phoneNumber.toString();
        console.log("인증 번호 요청 : " + phoneNumber);
        SMS.request_verificationCode(phoneNumber);
        res.status(200).json({message:"요청 성공"});
    }
    else {
        console.log("잘못된 양식");
        return res.status(400).json({message:"잘못된 양식의 요청"});
    }
}
