import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    
    if(req.method ==='PUT'){
        const updateStatus = await prisma.t_order.update({
            where:{
              order_id: Number(req.body.order_id),
              //user_id: user_id,  //외래키 지정 후 시도
            },
            data: {
              status: Number(req.body.status),
            
            },
          });
          res.status(200).json(updateStatus)
    }

}