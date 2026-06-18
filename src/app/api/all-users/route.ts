import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        // Fetch all users from the database
        const getAllUsers = await prisma.user.findMany();

        // Return the users in the JSON response with a 200 OK status
        return NextResponse.json(
            {
                success: true,
                data: getAllUsers
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to fetch users:", error);

        // Return an error response if something goes wrong
        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error"
            },
            { status: 500 }
        );
    }
}