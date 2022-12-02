import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    
    const updateStatus = await prisma.t_order.findMany({
        where:{
            status: 1,
        }
    })
    res.status(200).json(updateStatus)
}