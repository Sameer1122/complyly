import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { reportId, userId } = session.metadata ?? {};

    if (!reportId || !userId) {
      console.error("Missing metadata in Stripe session");
      return NextResponse.json({ received: true });
    }

    // Idempotency check: only process if not already unlocked
    const report = await prisma.report.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      console.error(`Report ${reportId} not found`);
      return NextResponse.json({ received: true });
    }

    if (report.isUnlocked) {
      // Already processed — idempotent, return success
      return NextResponse.json({ received: true });
    }

    // Verify ownership
    if (report.userId !== userId) {
      console.error(
        `User mismatch: report ${reportId} belongs to ${report.userId}, not ${userId}`
      );
      return NextResponse.json({ received: true });
    }

    // Unlock the report
    await prisma.report.update({
      where: { id: reportId },
      data: {
        isUnlocked: true,
        status: "UNLOCKED",
        pricePaid: 4.99,
        stripePaymentIntentId: session.payment_intent as string,
      },
    });
  }

  return NextResponse.json({ received: true });
}
