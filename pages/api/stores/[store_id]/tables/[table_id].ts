import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

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
        const oldData : any = await prisma.store_table.findFirst({where:{table_id}});

        const description:string = req.body.description ?? oldData.description;
        const max_people: number = Number(req.body.max_people ?? oldData.max_people);
        const status: number = Number(req.body.status ?? oldData.status);

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

    }  else if (req.method == "GET") {
        const result = await prisma.store_table.findFirst({ where: { table_id: table_id } });
        res.status(200).json(result)
    } else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }

}