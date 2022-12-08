import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const userId: number = Number(req.query.userId);
    const prisma = new PrismaClient();


    if (req.method == "GET") {
        const result = await prisma.user.findFirst({ where: { user_id: userId } });
        if (JSON.stringify(result) == '[]') {
            res.status(400).json({ message: "해당 아이디는 회원이 아닙니다." });
            return;
        }
        res.status(200).json(result)
    }

    // POST 유저 정보 수정
    else if (req.method == "POST") {
        // 기존 정보
        const oldData: any = await prisma.user.findUnique({ where: { user_id: userId } });

        // 갱신 정보
        const phoneNumber: string = req.body.phoneNumber ?? oldData.phone_number;
        const email: string = req.body.email ?? oldData.email_addr;
        const name: string = req.body.name ?? oldData.user_name;

        const result = await prisma.user.update({
            where: {
                user_id: userId
            },
            data: {
                phone_number: phoneNumber,
                email_addr: email,
                user_name: name
            }
        })
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ message: "잘못된 요청입니다." });
    }

}