import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ReportClient } from "./report-client";
import type { ClauseAnalysis } from "@/lib/report-types";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.userId !== session.userId) redirect("/dashboard");
  if (!report.isUnlocked) redirect(`/preview/${id}`);

  return (
    <ReportClient
      report={{
        id: report.id,
        fileName: report.fileName,
        category: report.category,
        summary: report.summary,
        riskScore: report.riskScore,
        clauseAnalysis: report.clauseAnalysis as ClauseAnalysis[] | null,
        recommendations: report.recommendations as string[] | null,
        redFlags: report.redFlags as string[] | null,
        actionChecklist: report.actionChecklist as string[] | null,
        createdAt: report.createdAt.toISOString(),
      }}
    />
  );
}
