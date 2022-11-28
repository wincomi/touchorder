import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

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
    
    // 메뉴 조회
    if (req.method == "GET") {
        const result = await prisma.menu.findMany({ where: { store_id: store_id } });
        res.status(200).json(result)
    } 
    else if (req.method == "POST") { 
        // 메뉴 생성
        const name:string               = String(req.body.name);
        const content :string | null    = req.body.content === undefined ? null : req.body.content;
        const price: number             = Number(req.body.price);
        const category:string           = String(req.body.category);
        const image_url:string | null   = req.body.image_url === undefined ? null : req.body.image_url;
        const status: number            = Number(req.body.status);

        // body 값 유효성 확인
        if (!validateRequestBody(req)){
            res.status(400).json({message:"요청 포맷이 올바르지 않습니다."})
            return;
        }
        
        const result = await prisma.menu.create({data : {
            store_id,
            name,
            content,
            price,
            category,
            image_url,
            status
        }})
        res.status(200).json(result);
    } else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }

}

function validateRequestBody(req: NextApiRequest) : boolean{
    
    if(req.body.name == undefined)
        return false;

    if (isNaN(Number(req.body.price)))
        return false;

    if (isNaN(Number(req.body.status)))
        return false;

    if (req.body.category == undefined)
        return false;
    
    return true;
}