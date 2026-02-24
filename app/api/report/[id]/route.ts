import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.userId !== session.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // If not unlocked, redact sensitive fields
  if (!report.isUnlocked) {
    return NextResponse.json({
      id: report.id,
      userId: report.userId,
      category: report.category,
      fileName: report.fileName,
      fileType: report.fileType,
      status: report.status,
      summary: report.summary,
      riskScore: report.riskScore,
      isUnlocked: report.isUnlocked,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
      // Redacted fields
      clauseAnalysis: null,
      recommendations: null,
      redFlags: null,
      actionChecklist: null,
      extractedText: null,
    });
  }

  return NextResponse.json(report);
}
