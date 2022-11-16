import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function allStoreList(req: NextApiRequest,res: NextApiResponse) {
    const prisma = new PrismaClient()
    // const view = await prisma.review.findMany({
    //     take: 50,  //limit => 50개까지만 
    //     orderBy:[
    //       {regdate: 'desc'},{rating: 'desc'} //최근 등록일 + 평점순 정렬
    //     ],
    //   });
    const view = await prisma.$queryRaw`SELECT r.review_id, r.regdate, u.user_name, s.name as store_name, m.name as menu_name, r.rating, r.content FROM review as r LEFT JOIN store as s ON s.store_id = r.store_id LEFT JOIN menu as m on m.menu_id = r.menu_id LEFT JOIN user as u ON u.user_id = r.user_id where s.store_id = r.store_id order by regdate desc, rating desc`

    res.send(view)
    
}