export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      emailShipping: true,
      emailMarketing: true,
      emailReferral: true,
    },
  });

  return NextResponse.json(user);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { emailShipping, emailMarketing, emailReferral } = body;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(typeof emailShipping === "boolean" && { emailShipping }),
      ...(typeof emailMarketing === "boolean" && { emailMarketing }),
      ...(typeof emailReferral === "boolean" && { emailReferral }),
    },
  });

  return NextResponse.json({ success: true });
}
