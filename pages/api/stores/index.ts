import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    const storeId:number|null=Number(req.query.store_id) as number ?? null;
    switch (req.method) {
        // READ
        case "GET":
                const readResult = await prisma.store.findMany();

                if (readResult != null) {
                    res.status(200).json({readResult})
                } else {
                    res.status(400).json({
                        "message": "store가 없습니다."
                    })
                } 
                break
        // CREATE
        case "POST":
            if (req.body.name == null) {
                res.status(400).json({
                    "message": "가게 이름을 입력해주세요."
                })
            } else if (req.body.address == null) {
                res.status(400).json({
                    "message": "가게 주소를 입력해주세요."
                })
            } else if (req.body.phone == null) {
                res.status(400).json({
                    "message": "가게 전화번호를 입력해주세요."
                })
            } else {
                const createResult = await prisma.store.create({ 
                    data: {
                        name: req.body.name,
                        address: req.body.address,
                        phone: req.body.phone,
                        content: req.body.content,
                        deposit: !isNaN(Number(req.body.deposit)) ? Number(req.body.deposit) : undefined,
                        primary_color: req.body.primary_color,
                        image_url: req.body.image_url
                    }
                })

                if (createResult != null) {
                    res.status(200).json(createResult)
                } else {
                    res.status(400).json({
                        "message": "store를 등록할 수 없습니다."
                    })
                } 
            }
            break
        default:
            res.status(400).json({message:"잘못된 요청"});
    }
}