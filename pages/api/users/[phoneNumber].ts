import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {phoneNumber} = req.query;

    // 타입 검사 - 안하면 14행에서 경고 표시
    if (typeof phoneNumber !== 'string'){
        res.status(400).json({message:"잘못된 값 입력"})
        return;
    }

    const prisma = new PrismaClient();
    const result = await prisma.user.findFirst({ where: {phone_number:phoneNumber} });
    
    if (result != null) {
        res.status(200).json(result)
    } else {
        res.status(400).json({
            "message": "해당 번호는 회원이 아닙니다."
        })
    }

}