export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateReferralCode } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let referral = await prisma.referral.findUnique({
    where: { ownerUserId: session.user.id },
    include: {
      redemptions: {
        select: {
          id: true,
          createdAt: true,
          firstInvoicePaidAt: true,
        },
      },
    },
  });

  if (!referral) {
    // Generate unique code
    let code = generateReferralCode();
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.referral.findUnique({
        where: { code },
      });
      if (!existing) break;
      code = generateReferralCode();
      attempts++;
    }

    referral = await prisma.referral.create({
      data: {
        code,
        ownerUserId: session.user.id,
      },
      include: {
        redemptions: {
          select: {
            id: true,
            createdAt: true,
            firstInvoicePaidAt: true,
          },
        },
      },
    });
  }

  return NextResponse.json({
    code: referral.code,
    totalReferred: referral.redemptions.length,
    totalPaid: referral.redemptions.filter((r) => r.firstInvoicePaidAt).length,
  });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { code } = body;

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const referral = await prisma.referral.findUnique({
    where: { code: code.trim().toUpperCase() },
  });

  if (!referral) {
    return NextResponse.json(
      { error: "Invalid referral code" },
      { status: 404 }
    );
  }

  if (referral.ownerUserId === session.user.id) {
    return NextResponse.json(
      { error: "Cannot use your own code" },
      { status: 400 }
    );
  }

  const existing = await prisma.referralRedemption.findFirst({
    where: { redeemedByUserId: session.user.id },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Already redeemed a referral" },
      { status: 400 }
    );
  }

  await prisma.referralRedemption.create({
    data: {
      referralCode: referral.code,
      redeemedByUserId: session.user.id,
    },
  });

  return NextResponse.json({ redeemed: true });
}
