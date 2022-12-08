import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient, user } from '@prisma/client'

const prisma = new PrismaClient()

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone_number: { label: "PhoneNumber", type: "text", placeholder: "PhoneNumber" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user: user | null = await prisma.user.findFirst({
                    where: {
                        phone_number: credentials?.phone_number,
                    }
                })

                if (user == null) {
                    throw new Error("회원을 찾을 수 없습니다.");
                }

                return {
                    user_id: user!.user_id,
                    store_id: user!.store_id,
                    phone_number: user!.phone_number,
                    email_addr: user!.email_addr,
                    is_admin: user!.is_admin,
                    token: user!.token,
                    user_name: user!.user_name
                }
            }
        })
    ],

    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                session.user.id = token.uid as string
            }
            session.user = token

            return session
        },
        jwt: async ({ user, token }) => {
            if (user) {
                token.uid = user.id
            }
            return { ...token, ...user }
        },
    },
    session: {
        strategy: "jwt",
    },
})
