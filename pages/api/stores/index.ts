import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    switch (req.method) {
        // READ
        case "GET":
            const readResult = await prisma.store.findMany();

            if (readResult != null) {
                res.status(200).json(readResult)
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
                        primary_color: req.body.primary_color
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
        // UPDATE
        case "PUT":
            if (req.body.store_id == null) {
                res.status(400).json({
                    "message": "store_id를 입력하세요."
                })
            } else {
                const createResult = await prisma.store.update({ 
                    where: {
                        store_id: req.body.store_id
                    },
                    data: {
                        name: req.body.name != null ? req.body.name : undefined,
                        address: req.body.address != null ? req.body.address : undefined,
                        phone: req.body.phone != null ? req.body.phone : undefined,
                        content: req.body.content != null ? req.body.content : undefined,
                        deposit: !isNaN(Number(req.body.deposit)) ? Number(req.body.deposit) : undefined,
                        primary_color: req.body.primary_color != null ? req.body.primary_color : undefined,
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
    }
}