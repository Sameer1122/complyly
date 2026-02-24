import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = (formData.get("category") as string) || "Housing / Tenancy";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !["pdf", "docx"].includes(ext)) {
    return NextResponse.json(
      { error: "Only PDF and DOCX files are supported" },
      { status: 400 }
    );
  }

  // Upload to Vercel Blob
  const blob = await put(
    `documents/${session.userId}/${Date.now()}-${file.name}`,
    file,
    { access: "public" }
  );

  // Create report record
  const report = await prisma.report.create({
    data: {
      userId: session.userId,
      category,
      fileName: file.name,
      fileUrl: blob.url,
      fileType: ext,
      status: "UPLOADED",
    },
  });

  return NextResponse.json({ reportId: report.id });
}
