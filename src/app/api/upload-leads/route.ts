import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const data = await req.json();
        const lead = await prisma.lead.create({
            data: {
                lead: data.lead,
                paymentStatus: data.paymentStatus,
                assignedUserId: data.assignUser,
            },
        })

        return NextResponse.json(
            {
                message: 'Lead created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Lead creation error:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}