import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginSchema } from "./schema/login";



export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                const validateFields = loginSchema.safeParse(credentials);
                if (!validateFields.success) {
                    throw new Error(validateFields.error.message);
                }
                const { email, password } = validateFields.data;
                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
                if (!user || !user.hashedPassword) return null;
                const matchPassword = await bcrypt.compare(password, user.hashedPassword);
                if (!matchPassword) return null;
                return user;
            }
        })
    ]
})