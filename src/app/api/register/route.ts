import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { password, email, ...data } = body;

        if (!password) {
            return NextResponse.json(
                { message: 'Password is required' },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return NextResponse.json(
                {
                    message: 'User already exist',
                },
                { status: 403 }
            );
        }

        const user = await prisma.user.create({
            data: {
                ...data,
                email,
                hashedPassword,
            },
        });

        return NextResponse.json(
            {
                message: 'User created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('User creation error:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}