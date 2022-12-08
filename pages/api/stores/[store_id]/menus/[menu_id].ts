/*

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const store_id: number = Number(req.query.store_id)
    const table_id: number = Number(req.query.table_id)
    const prisma = new PrismaClient()

    // 만약 숫자가 아닌 다른 값이 들어갈 경우 400 Bad Request
    if (isNaN(store_id) || isNaN(table_id)) {
        res.status(400).json({
            "message": "가게 및 테이블 아이디는 숫자로 요청해야합니다."
        })
        return;
    }
    
    // 테이블 수정
    if (req.method == "POST") {  
        const description:string = String(req.body.description);
        const max_people: number = Number(req.body.max_people);
        const status: number = Number(req.body.status);

        if (isNaN(max_people) || isNaN(status)) {
            res.status(400).json({message:"요청이 올바르지 않습니다."});
            return;
        }

        const result = await prisma.store_table.update({
            where:{
                table_id
            }, 
            data:{
                max_people,
                description,
                status
            }
        });

        res.status(200).json(result)
    } 
    // 테이블 삭제
    else if (req.method == "DELETE") { 
        const result = await prisma.store_table.delete({where:{table_id}});
        res.status(400).json(result);

    } else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }

}
*/




import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const store_id: number = Number(req.query.store_id)
    const menu_id: number = Number(req.query.menu_id)

    // 만약 숫자가 아닌 다른 값이 들어갈 경우 400 Bad Request
    if (isNaN(store_id) || isNaN(menu_id)) {
        res.status(400).json({
            "message": "가게 및 메뉴 아이디는 숫자로 요청해야합니다."
        })
        return;
    }

    const prisma = new PrismaClient()


    // 메뉴 수정
    if (req.method == "POST") {
        const oldData: any = await prisma.menu.findUnique({ where: { menu_id } });

        const name: string = req.body.name ?? oldData.name;
        const content: string | null = req.body.content ?? oldData.content;
        const price: number = Number(req.body.price ?? oldData.number);
        const category: string = req.body.category ?? oldData.category;
        const image_url: string | null = req.body.image_url ?? oldData.image_url;
        const status: number = Number(req.body.status ?? oldData.status);

        // body 값 유효성 확인
        if (!validateRequestBody(req)) {
            res.status(400).json({ message: "요청 포맷이 올바르지 않습니다." })
            return;
        }
        const result = await prisma.menu.update({
            where: {
                menu_id
            },
            data: {
                store_id,
                name,
                content,
                price,
                category,
                image_url,
                status
            }
        });
        res.status(200).json(result);
    } else if (req.method == "DELETE") {        // 메뉴 삭제
        const result = await prisma.menu.delete({ where: { menu_id } });
        res.status(400).json(result);

    } else if (req.method == "GET") {
        const result = await prisma.menu.findFirst({ where: { menu_id: menu_id } });
        res.status(200).json(result)
    } else {
        res.status(400).json({ message: "잘못된 요청입니다." });
    }

}

function validateRequestBody(req: NextApiRequest): boolean {

    if (req.body.name == undefined)
        return false;

    if (isNaN(Number(req.body.price)))
        return false;

    // if (isNaN(Number(req.body.status)))
    //     return false;

    // if (req.body.category == undefined)
    //     return false;

    return true;
}