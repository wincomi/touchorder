import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    // GET - 모든 주문 내역(세부)
    // GET - ?orderId= 쿼리라면 해당하는 주문 내역
    if (req.method === "GET") {
        
        // 쿼리값이 있을 때
        if(req.query.orderId !== undefined)
        {
            getConditionOrderId (req, res, prisma, req.query.orderId);
            
        } 
        else  // 단순 GET
        {
            getAll(req, res, prisma);
        }  
    } else if (req.method === "POST") { // POST - 상세 주문하기
        const orderId = req.body.orderId;           // 주문 번호
        const menuId = req.body.menuId;             // 메뉴 번호
        const count:number = Number(req.body.count);// 개수

        // 메뉴 정보 받아오기
        let menuInfo:any = await prisma.$queryRaw`SELECT * FROM menu WHERE menu_id=${menuId}`;
        
        // 정보가 없을 때
        if (JSON.stringify(menuInfo) == '[]') {
            console.log(JSON.stringify(menuInfo));
            res.status(400).json({message:"주문하신 메뉴는 존재하지 않습니다.", menuId});
            return;
        }

        // 받아온 정보
        const menuName: string = menuInfo[0].name;;  // 메뉴 번호로 부터
        const price :number = Number(menuInfo[0].price);
        const payment :number = price * count;


        // 상세 주문하기
        await prisma.$queryRaw
            `INSERT INTO detailed_order(order_id, menu_id, menu_name, price, count, payment) 
            VALUES(${orderId}, ${menuId}, ${menuName}, ${price}, ${count}, ${payment})`;
        
        let addedDetailedOrderInfo:any = await prisma.$queryRaw
            `SELECT * 
            FROM detailed_order 
            WHERE order_id = ${orderId} AND menu_id = ${menuId} AND count = ${count}`;
        
            addedDetailedOrderInfo[0].message = "상세 주문 완료"
        console.log(addedDetailedOrderInfo);
        res.status(200).json(addedDetailedOrderInfo);
    }
    // GET, POST 외에 다른 메서드
    else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }
}


// 단순 GET
async function getAll (req: NextApiRequest, res: NextApiResponse, prisma:PrismaClient) {
    let result = await prisma.$queryRaw`SELECT * FROM detailed_order`;
    res.status(200).json(result);
}

// GET orderId 쿼리
async function getConditionOrderId (req: NextApiRequest, res: NextApiResponse, prisma:PrismaClient, orderId:any) {
    let result = await prisma.$queryRaw`SELECT * FROM detailed_order WHERE order_id=${orderId}`;
    res.status(200).json(result);
}