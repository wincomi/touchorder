import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
import { objectEnumValues } from '@prisma/client/runtime';
import { stringify } from 'querystring';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const orderId : number = Number(req.query.orderId);


    const prisma = new PrismaClient();
    
    // GET : 해당 주문 번호에 대한 상세 정보
    if (req.method === 'GET') {
        let result:any = await prisma.t_order.findUnique({where:{order_id:orderId}});

        if(result == null) {
            res.status(400).json({message:"해당 주문 번호는 존재하지 않습니다"});
            return;
        }

        // 해당 주문 번호에 대한 상세 내역 가져오기
        let detailedOrdersRes = await prisma.detailed_order.findMany({where:{order_id:orderId}});
        
        // 데이터 합치기
        result.detailed_orders = detailedOrdersRes;
        res.status(200).json(result);

    // POST : 추가 주문하기
    } else if (req.method === 'POST') {
        const result : any = await prisma.t_order.findUnique({where:{order_id:orderId}});
        if(result == null){
            res.status(400).json({message:"추가 주문 실패, 해당 주문 번호는 존재하지 않습니다."});
            return;
        }
        
        const userId = result.user_id;
        const storeId = result.store_id;
        const tableId = result.table_id;
        result.detailed_orders = await Promise.all(
            req.body.detailedOrders.map(async (detailedOrder:any)=>{
                // 메뉴 정보 받아오기
                const menuId = detailedOrder.menuId;
                const count = detailedOrder.count;
                let menuInfo:any = await prisma.$queryRaw`SELECT * FROM menu WHERE menu_id=${menuId}`;
    
                if (JSON.stringify(menuInfo) === '[]'){
                    return {message:`메뉴 아이디 ${menuId} 없음`};
                }
    
                // 받아온 정보
                const menuName: string = menuInfo[0].name;  // 메뉴 번호로 부터
                const price :number = Number(menuInfo[0].price);
                const payment :number = price * count;
    
                // 상세 주문하기
                const detailedOrderResult = await prisma.detailed_order.create({
                    data:{
                        order_id:orderId,
                        menu_id:menuId,
                        menu_name:menuName,
                        price,
                        count,
                        payment
                    }
                });
                
                // 결과에 추가
                return detailedOrderResult
            })
        );

        res.status(200).json(result);
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