import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient()
    let time = dayjs();
    const currentTime = time.format('YYYY-MM-DD HH:mm');
    const method = req.method;
    const reservationId : number = Number(req.query.reservationId);

    if (isNaN(reservationId)){
        res.status(400).json({message:"잘못된 요청"});
        return;
    }

    // 해당 예약 번호로 조회
    if (method == "GET") {
        const result = await prisma.$queryRaw`SELECT store.name, reserve.* FROM store, reserve WHERE (store.store_id = reserve.store_id) AND (reserve_id = ${reservationId})`;
        res.status(200).json(result);
    }
    // 예약 취소
    else if (method == "DELETE")
    {
        const result = await prisma.reserve.delete({where:{reserve_id:reservationId}});
        res.status(200).json({message:"예약 취소"});
    }
    // 이외의 요청
    else {
        res.status(400).json({message:"잘못된 요청"});
    }
}

