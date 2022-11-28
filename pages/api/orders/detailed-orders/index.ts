import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(400).json({message:"잘못된 요청입니다."});
}