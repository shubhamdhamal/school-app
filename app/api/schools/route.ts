import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
    try {
        const db = await connectDB();
        const [rows] = await db.execute("SELECT * FROM schools ORDER BY id DESC");
        await db.end();

        return NextResponse.json(rows);
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json(
            { error: "Failed to fetch schools" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, address, city, state, contact, image, email_id } = await request.json();

        if (!name || !address || !city || !state || !email_id) {
            return NextResponse.json(
                { error: "Required fields missing" },
                { status: 400 }
            );
        }

        const db = await connectDB();
        await db.execute(
            "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, address, city, state, contact || null, image || null, email_id]
        );
        await db.end();

        return NextResponse.json({ message: "School added successfully!" });
    } catch (err) {
        console.error("Database error:", err);
        return NextResponse.json(
            { error: "Failed to add school" },
            { status: 500 }
        );
    }
}
