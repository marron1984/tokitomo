export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STYLES = ["kawaii", "minimal", "traditional", "study"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { style } = body;

  if (!style || !VALID_STYLES.includes(style)) {
    return NextResponse.json({ error: "Invalid style" }, { status: 400 });
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { preferenceStyle: style },
  });

  return NextResponse.json({ style });
}
