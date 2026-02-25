import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { getResend } from "@/lib/resend";
import { sendCodeSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[send-code] Request body:", body);

    const parsed = sendCodeSchema.safeParse(body);
    if (!parsed.success) {
      console.log("[send-code] Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    console.log("[send-code] Email:", email);

    // Rate limit: max 3 codes per email per 15 minutes
    const recentCodes = await prisma.verificationCode.count({
      where: {
        email,
        createdAt: { gt: new Date(Date.now() - 15 * 60 * 1000) },
      },
    });
    console.log("[send-code] Recent codes count:", recentCodes);

    if (recentCodes >= 3) {
      console.log("[send-code] Rate limited");
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 }
      );
    }

    const code = crypto.randomInt(100000, 999999).toString();
    console.log("[send-code] Generated code:", code);

    // Upsert user (create if first time)
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    console.log("[send-code] User upserted:", { id: user.id, email: user.email });

    // Invalidate any existing unused codes for this email
    const invalidated = await prisma.verificationCode.updateMany({
      where: { email, used: false },
      data: { used: true },
    });
    console.log("[send-code] Invalidated old codes:", invalidated.count);

    // Create new code (10 minute expiry)
    const verification = await prisma.verificationCode.create({
      data: {
        email,
        userId: user.id,
        code,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    console.log("[send-code] Verification created:", { id: verification.id, expiresAt: verification.expiresAt });

    // Send via Resend
    console.log("[send-code] Sending email via Resend to:", email);
    const emailResult = await getResend().emails.send({
      from: "Complyly <onboarding@resend.dev>",
      to: email,
      subject: "Your Complyly login code",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
          <h2 style="color: #AD6DF4; margin-bottom: 8px;">Complyly</h2>
          <p style="color: #6b7280; margin-bottom: 24px;">Understand Where You Stand</p>
          <p>Your verification code is:</p>
          <div style="background: #f3f4f6; border-radius: 8px; padding: 16px; text-align: center; margin: 16px 0;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #171717;">${code}</span>
          </div>
          <p style="color: #6b7280; font-size: 14px;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    console.log("[send-code] Resend response:", JSON.stringify(emailResult, null, 2));

    console.log("[send-code] Success — code sent to", email);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as Record<string, unknown>;
    console.error("[send-code] Error:", {
      message: err?.message,
      type: err?.type,
      error: err?.error,
      code: err?.code,
      cause: err?.cause,
      stack: (error instanceof Error) ? error.stack : undefined,
      raw: String(error),
    });
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
