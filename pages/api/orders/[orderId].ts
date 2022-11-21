import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { objectEnumValues } from '@prisma/client/runtime';
import { stringify } from 'querystring';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { orderId } = req.query;


    const prisma = new PrismaClient();
    
    // GET : 해당 주문 번호가 있는지 확인
    if (req.method === 'GET') {
        let result:any = await prisma.$queryRaw`SELECT * FROM t_order WHERE order_id = ${orderId}`;

        if(JSON.stringify(result) === '[]') {
            res.status(400).json({message:"해당 주문 번호는 존재하지 않습니다"});
            return;
        }

        // 해당 주문 번호에 대한 상세 내역 가져오기
        let detailedOrdersRes = await axios.get(process.env.API_URL+`orders/detailed-orders?orderId=${orderId}`);

        // 데이터 합치기
        result[0].detailed_orders = detailedOrdersRes.data;
        res.status(200).json(result[0]);

    // POST : 주문하기 (추가 주문 포함)
    } else if (req.method === 'POST') {
        const menuId = req.body.menuId;             // 메뉴 ID
        const count:number = Number(req.body.count);// 개수
        //  POST    /api/orders/detailed-orders로 대신 처리
        let addedDetailedOrderRes = await axios.post(process.env.API_URL+`orders/detailed-orders`, {
            orderId,
            menuId,
            count
        });
        res.status(addedDetailedOrderRes.status).json(addedDetailedOrderRes.data);
        return;

    // DELETE : 주문 삭제(해당 주문 전체)
    } else if (req.method === 'DELETE') {
        let result = await prisma.$queryRaw`DELETE FROM t_order WHERE order_id = ${orderId}`;
        await prisma.$queryRaw`DELETE FROM detailed_order WHERE order_id = ${orderId}`;     // 상세 주문 내역도 삭제

        res.status(200).json({message:`주문을 삭제하였습니다.`, orderId});
    }
    else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }
}