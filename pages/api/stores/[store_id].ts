import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req:NextApiRequest, res:NextApiResponse) => {
    const store_id : number = Number(req.query.store_id);
    const prisma = new PrismaClient();

    if (isNaN(store_id)){
        res.status(400).json({message:"store_id 는 숫자 값이어야 합니다."})
        return;
    }


    // Update (수정)
    if(req.method == "POST"){
        let oldData:any = await prisma.store.findFirst({where:{store_id}});

        let name:string     = req.body.name ?? oldData.name;
        let address:string  = req.body.address ?? oldData.address;
        let phone:string    = req.body.phone ?? oldData.phone;
        let content:string  = req.body.content ?? oldData.content;
        let deposit:number  = Number(req.body.deposit ?? oldData.deposit);
        let image_url:string = req.body.image_url ?? oldData.image_url;
        
        const result = await prisma.store.update({
            where:{store_id}, 
            data:{
                name,
                address,
                phone,
                content,
                deposit,
                image_url
        }})
        res.status(200).json(result);

    } else {
        res.status(400).json({message:"잘못된 요청입니다."});
    }

}