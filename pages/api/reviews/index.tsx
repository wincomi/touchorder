import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()

    const allReview = await prisma.$queryRaw`SELECT r.review_id, r.regdate, u.user_name, s.name as store_name, m.name as menu_name, r.rating, r.content, r.image_url1, image_url2, image_url3, r.user_id/*, round(avg(r.rating)over(partition by r.store_Id),1) as avg_rating */
                                                FROM review as r LEFT JOIN store as s ON s.store_id = r.store_id LEFT JOIN menu as m on m.menu_id = r.menu_id LEFT JOIN user as u ON u.user_id = r.user_id 
                                                    order by regdate desc, rating desc`
    res.status(200).send(allReview)

}