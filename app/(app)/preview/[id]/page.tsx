import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PreviewClient } from "./preview-client";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const report = await prisma.report.findUnique({ where: { id } });

  if (!report || report.userId !== session.userId) redirect("/dashboard");
  if (report.isUnlocked) redirect(`/report/${id}`);
  if (report.status === "PROCESSING" || report.status === "UPLOADED") {
    redirect(`/processing/${id}`);
  }

  return (
    <PreviewClient
      report={{
        id: report.id,
        fileName: report.fileName,
        category: report.category,
        summary: report.summary,
        riskScore: report.riskScore,
        status: report.status,
        createdAt: report.createdAt.toISOString(),
      }}
    />
  );
}
