import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const store_id: number = Number(req.query.store_id)

    if (!isNaN(store_id)) {
        const prisma = new PrismaClient()
        const result = await prisma.store_table.findMany({ where: { store_id: store_id } });
    
        if (result != null) {
            res.status(200).json(result)
        } else {
            res.status(400).json({
                "message": "store_id에 해당하는 store의 store_menu가 없습니다."
            })
        }
    } else {
        // 만약 store_id에 숫자가 아닌 다른 값이 들어갈 경우 400 Bad Request
        res.status(400).json({
            "message": "store_id는 숫자로 요청해야합니다."
        })
    }
}