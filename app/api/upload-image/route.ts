import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            return NextResponse.json(
                { error: "File must be an image" },
                { status: 400 }
            );
        }

        // Create directory if it doesn't exist
        const uploadDir = join(process.cwd(), "public", "schoolImages");
        await mkdir(uploadDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const extension = file.name.split(".").pop();
        const filename = `${timestamp}.${extension}`;
        const filepath = join(uploadDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        return NextResponse.json({
            image: `/schoolImages/${filename}`
        });
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        );
    }
}
