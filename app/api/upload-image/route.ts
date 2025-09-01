import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "File must be an image" }, { status: 400 });
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file.stream(), {
            access: "public",
            contentType: file.type,
        });

        return NextResponse.json({ image: blob.url });
    } catch (err) {
        console.error("Upload error:", err);
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
