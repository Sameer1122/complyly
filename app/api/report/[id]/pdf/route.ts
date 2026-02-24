import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateReportPDF } from "@/lib/pdf-generator";
import type { ClauseAnalysis } from "@/lib/report-types";

export const maxDuration = 30;

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

  if (!report.isUnlocked) {
    return NextResponse.json(
      { error: "Report not unlocked" },
      { status: 403 }
    );
  }

  const pdfBuffer = await generateReportPDF({
    fileName: report.fileName,
    category: report.category,
    summary: report.summary,
    riskScore: report.riskScore,
    clauseAnalysis: report.clauseAnalysis as ClauseAnalysis[] | null,
    recommendations: report.recommendations as string[] | null,
    redFlags: report.redFlags as string[] | null,
    actionChecklist: report.actionChecklist as string[] | null,
  });

  // Update status to PDF_READY if not already
  if (report.status !== "PDF_READY") {
    await prisma.report.update({
      where: { id },
      data: { status: "PDF_READY" },
    });
  }

  return new NextResponse(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="complyly-report-${id}.pdf"`,
    },
  });
}
