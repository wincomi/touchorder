import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userId:number = Number(req.query.userId);

    // 타입 검사 - 안하면 14행에서 경고 표시

    const prisma = new PrismaClient();
    const result = await prisma.user.findFirst({ where: {user_id:userId} });
    
    if (result != null) {
        res.status(200).json(result)
    } else {
        res.status(400).json({
            "message": `해당 아이디는 회원이 아닙니다.`
        })
    }

}