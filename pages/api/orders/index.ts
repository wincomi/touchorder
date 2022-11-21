import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'
import { getPrismaClient } from '@prisma/client/runtime';
import Store_id from '../store-menus/[store_id]';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    // GET - 전체 주문 조회
    if (req.method === "GET") {
        let result = await prisma.$queryRaw`SELECT * FROM t_order`;
        if (JSON.stringify(result) == '[]') {
            res.status(400).json({message:"데이터가 없습니다."});
            return;
        }

        res.status(200).json(result);
    // POST - 신규 주문(번호) 생성
    } else if (req.method === "POST") {
        const userId = req.body.userId;
        const storeId = req.body.storeId;
        const tableId:number|null = Number(req.body.tableId);

        let result;
        // 신규 주문 생성
        result = await prisma.$queryRaw
            `INSERT INTO t_order(user_id, store_id, table_id) 
            VALUES(${userId}, ${storeId}, ${tableId})`;
        
        // 검색
        const searchResult:any = await prisma.$queryRaw
            `SELECT order_id AS orderId, date 
            FROM t_order 
            WHERE user_id = ${userId} AND store_id = ${storeId}
            ORDER BY date desc`;    // 가장 최근 순으로 내림 차순

        // 신규 주문 번호 정보
        const createdOrderIdInfo = searchResult[0]; 
        res.status(200).json(createdOrderIdInfo);
    }
    else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }
}

