import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { extractText } from "@/lib/document-parser";
import { getOpenAI } from "@/lib/openai";
import { buildAnalysisPrompt } from "@/lib/analysis-prompt";
import { analyseReportSchema } from "@/lib/validations";
import type { AnalysisResult } from "@/lib/report-types";

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = analyseReportSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { reportId } = parsed.data;

  const report = await prisma.report.findUnique({ where: { id: reportId } });
  if (!report || report.userId !== session.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Update status to PROCESSING
  await prisma.report.update({
    where: { id: reportId },
    data: { status: "PROCESSING" },
  });

  try {
    // 1. Fetch file from Vercel Blob
    const fileResponse = await fetch(report.fileUrl);
    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Extract text
    const extractedText = await extractText(buffer, report.fileType);

    // 3. Run GPT-4o analysis
    const prompt = buildAnalysisPrompt(extractedText, report.category);
    const completion = await getOpenAI().chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const analysisText = completion.choices[0].message.content;
    const analysis: AnalysisResult = JSON.parse(analysisText!);

    // 4. Save results
    await prisma.report.update({
      where: { id: reportId },
      data: {
        status: "PREVIEW_READY",
        extractedText,
        summary: analysis.summary,
        riskScore: analysis.riskScore,
        clauseAnalysis: analysis.clauseAnalysis as never,
        recommendations: analysis.recommendations as never,
        redFlags: analysis.redFlags as never,
        actionChecklist: analysis.actionChecklist as never,
      },
    });

    return NextResponse.json({ success: true, status: "PREVIEW_READY" });
  } catch (error) {
    console.error("Analysis failed:", error);
    // Revert status on failure
    await prisma.report.update({
      where: { id: reportId },
      data: { status: "UPLOADED" },
    });
    const message =
      error instanceof Error ? error.message : "Analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
