import { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from '@prisma/client'



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    const userId : number = Number(req.query.userId);
    const storeId: number = Number(req.query.storeId);

    // GET - 주문 조회
    if (req.method === "GET") {
        let result : any;
        // 전체 조회 - 쿼리가 없을 때
        if (isNaN(userId) && isNaN(storeId)) {
            result = await prisma.t_order.findMany();
        } else if ( !isNaN(userId) && isNaN(storeId) ) {   // 사용자의 전체 주문 조회
            result = await prisma.t_order.findMany({where:{user_id:userId}});
        } else if ( isNaN(userId) && !isNaN(storeId) ){    // 가게의 전체 주문 조회
            result = await prisma.t_order.findMany({where:{store_id:storeId}});
        } else {                        // 가게 & 사용자 주문 조회
            result = await prisma.t_order.findMany({
                where:{
                    user_id:userId,
                    store_id:storeId
                }
                });
        }

        // 검색 결과 없음
        if (result == null) {
            res.status(400).json({message:"데이터가 없습니다."});
            return;
        }
        res.status(200).json(result);

    // POST - 주문하기
    } else if (req.method === "POST") {
        await order(req, res);
    }
    else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }
}


async function order (req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()

    const storeId: number = Number(req.body.storeId);
    const userId: number = Number(req.body.userId);
    const tableId: number|null = isNaN(Number(req.body.tableId)) == true 
                                            ? null : Number(req.body.tableId);

    // 주문 번호 생성
    let result : any = await prisma.t_order.create({
        data:{
            user_id:userId,
            store_id:storeId,
            table_id:tableId
        }
    });
    const orderId = result.order_id // 생성된 주문 번호


    // 상세 주문 순회, 결과 값 result에 배열로 저장
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
            
            console.log(detailedOrderResult);
            // 결과에 추가
            return detailedOrderResult
        })
    );
    
    console.log("주문 결과");
    console.log(result);
    res.status(200).json(result);

}