import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import Store_id from '../stores/[store_id]'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    const updateStatus = await prisma.t_order.findMany({
        where: {
            store_id: Number(req.body.store_id),
            status: 1,
        }
    })
    res.status(200).json(updateStatus)
}