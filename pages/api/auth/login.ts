import { NextApiRequest, NextApiResponse } from 'next'
import { generateAccessToken, generateRefreshToken } from '@libs/token'
import { PrismaClient } from '@prisma/client'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user_id: number = req.body.user_id

    if (user_id != null) {
        const token = generateAccessToken(user_id)

        // 클라이언트의 쿠키에 토큰 저장
        res.setHeader('Set-Cookie', `token=${token}; path=/;`)

        // DB에 토큰 저장
        const prisma = new PrismaClient()
        const result = await prisma.user.update({
            where: { 
                user_id: user_id 
            },
            data: {
                token: token
            }
        })

        res.status(200).json({
            success: true
        })
    } else {
        res.status(400).json({
            message: "user_id 값은 필수입니다."
        })
    }
}
