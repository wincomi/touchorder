import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    var orderId = Number(req.body.order_id)

    let result = await prisma.detailed_order.findMany({ where: { order_id: orderId } })

    res.status(200).json(result);
}