import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { reportId } = parsed.data;

  const report = await prisma.report.findUnique({ where: { id: reportId } });
  if (!report || report.userId !== session.userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (report.isUnlocked) {
    return NextResponse.json(
      { error: "Report already unlocked" },
      { status: 400 }
    );
  }

  // Update status to PAYMENT_PENDING
  await prisma.report.update({
    where: { id: reportId },
    data: { status: "PAYMENT_PENDING" },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "Complyly Report Unlock",
            description: `Full analysis report for ${report.fileName}`,
          },
          unit_amount: 499, // £4.99 in pence
        },
        quantity: 1,
      },
    ],
    metadata: {
      reportId: report.id,
      userId: session.userId,
    },
    success_url: `${appUrl}/report/${reportId}?payment=success`,
    cancel_url: `${appUrl}/preview/${reportId}?payment=cancelled`,
  });

  // Store Stripe session ID for idempotency
  await prisma.report.update({
    where: { id: reportId },
    data: { stripeSessionId: checkoutSession.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
