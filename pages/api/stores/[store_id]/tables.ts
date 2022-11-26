import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { json } from 'stream/consumers'
import { stringify } from 'querystring'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const store_id: number = Number(req.query.store_id)
    const prisma = new PrismaClient()

    // 만약 store_id에 숫자가 아닌 다른 값이 들어갈 경우 400 Bad Request
    if (isNaN(store_id)) {
        res.status(400).json({
            "message": "store_id는 숫자로 요청해야합니다."
        })
        return;
    }

    
    // 테이블 조회
    if (req.method == "GET") {  
        const result = await prisma.store_table.findMany({ where: { store_id: store_id } });
        if (JSON.stringify(result) == '[]') {
            res.status(400).json({
                "message": "store_id에 해당하는 store의 store_menu가 없습니다."
            })
            return;
        } 
        res.status(200).json(result)
    } 
    else if (req.method == "POST") { 
        // 테이블 생성
        const description:string = String(req.body.description);
        const max_people: number = Number(req.body.max_people);
        const status: number = Number(req.body.status);

        if (isNaN(max_people) || isNaN(status)) {
            res.status(400).json({message:"요청이 올바르지 않습니다."});
            return;
        }
        
        const result = await prisma.store_table.create({data : {
            store_id,
            max_people,
            description,
            status
        }})
        res.status(200).json(result);

    } else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }

}