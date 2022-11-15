import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    const result = await prisma.store.findMany();

    if (result != null) {
        res.status(200).json(result)
    } else {
        res.status(400).json({
            "message": "store가 없습니다."
        })
    }

}