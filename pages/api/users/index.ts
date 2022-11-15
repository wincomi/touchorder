import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    switch (req.method) {
        // 전체 회원 조회
        case "GET":
            const readResult = await prisma.user.findMany();
            if (readResult != null) {
                res.status(200).json(readResult)
            } else {
                res.status(400).json({
                    "message": "사용자가 없습니다."
                })
            } 
            break
        // 회원 등록
        case "POST":
            if(!validateRequestBody(req)) {
                res.status(400).json({message:"요청 데이터가 잘못되었습니다."})
                return;
            }

            // 회원 확인
            const findResult = await prisma.user.findFirst({where: {phone_number:req.body.phone_number}});
            if(findResult !== null)
            {
                res.status(400).json({message:"해당 사용자는 이미 존재합니다."})
                return;
            }

            // 없다면 사용자 등록
            const createResult = await prisma.user.create({ 
                data: {
                    phone_number: req.body.phone_number,
                }
            })

            if (createResult != null) {
                res.status(200).json(createResult)
            } else {
                res.status(400).json({message: "사용자 등록에 실패했습니다."})
            }
            break
    }
}


function validateRequestBody(req: NextApiRequest){
    if (req.body.phone_number == null)
        return false;
    return true;
}


