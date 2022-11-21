import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { DefaultDeserializer } from 'v8';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { detailedOrderId } = req.query;
    const prisma = new PrismaClient();

    // GET : 해당 상세 주문 내역 있는지 확인
    if (req.method === 'GET') { 
        let result = await prisma.$queryRaw`SELECT * FROM detailed_order WHERE detailed_order_id = ${detailedOrderId}`;

        if(JSON.stringify(result) === '[]') {
            res.status(400).json({message:"해당 주문은 존재하지 않습니다"});
            return;
        }
        res.status(200).json(result);
    // POST : 주문 수정하기    
    } else if (req.method === 'POST') { 
        /* 
            POST or PUT 으로 상세 주문 수정 고려했으나
            여기서 DELETE, /api/orders/detailed-orders POST로 
            작동 가능하기에 무기한 보류
        */
        res.status(400).json({message:"잘못된 요청입니다"});

    // DELETE : 개별 주문 삭제(전체 주문에서 해당 내역만)
    } else if (req.method === 'DELETE') { 
        let result = await prisma.$queryRaw`DELETE FROM detailed_order WHERE detailed_order_id = ${detailedOrderId}`;
        res.status(200).json({detailedOrderId, message:"개별 주문 삭제"});
    } else {
        res.status(400).json({message:"잘못된 요청입니다"});
    }
}