import { setSourceMapRange } from "typescript";
const SMS = require('@libs/auth/sms');

export default (req, res) => {
    if (req.method == 'POST') {
        let phoneNumber = req.body.phoneNumber.toString();
        let verificationCode = req.body.verificationCode;
        let result = SMS.validate_verificationCode(phoneNumber, verificationCode);

        if (result == true){
            console.log("번호 인증 성공");
            return res.status(200).json({message:"번호 인증 성공!"});
        }
        else {
            console.log("번호 인증 실패");
            return res.status(400).json({message:"번호 인증 실패"});
        }
    }
    else {
        res.status(400).json({message:"잘못된 요청"});
    }
}
