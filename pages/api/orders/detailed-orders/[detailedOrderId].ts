import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { DefaultDeserializer } from 'v8';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const detailedOrderId: number = Number(req.query.detailedOrderId);
    const prisma = new PrismaClient();

    // GET : 해당 상세 주문 내역 있는지 확인
    if (req.method === 'GET') {
        let result = await prisma.detailed_order.findUnique({ where: { detailed_order_id: detailedOrderId } })

        if (result == null) {
            res.status(400).json({ message: "해당 상세 주문은 존재하지 않습니다" });
            return;
        }
        res.status(200).json(result);
        // DELETE : 상세 주문 삭제
    } else if (req.method === 'DELETE') {
        let result = await prisma.detailed_order.delete({where: {detailed_order_id:detailedOrderId}})

        if(result == null)
        {
            res.status(400).json({message:"주문 실패"});
            return;
        }

        let subtractedPayment = result.payment;
        let orderId = result.order_id;
        await prisma.$queryRaw`UPDATE t_order SET payments = payments - ${subtractedPayment} WHERE order_id = ${orderId}`;
        res.status(200).json({ detailedOrderId, message: "상세 주문 삭제" });
    } else {
        res.status(400).json({ message: "잘못된 요청입니다" });
    }
}