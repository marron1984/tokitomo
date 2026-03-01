export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const address = await prisma.address.findFirst({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ address });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { country, line1, line2, city, state, postalCode } = body;

  if (!country || !line1 || !city || !postalCode) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const existing = await prisma.address.findFirst({
    where: { userId: session.user.id },
  });

  let address;
  if (existing) {
    address = await prisma.address.update({
      where: { id: existing.id },
      data: {
        country: String(country).slice(0, 100),
        line1: String(line1).slice(0, 200),
        line2: line2 ? String(line2).slice(0, 200) : null,
        city: String(city).slice(0, 100),
        state: state ? String(state).slice(0, 100) : null,
        postalCode: String(postalCode).slice(0, 20),
      },
    });
  } else {
    address = await prisma.address.create({
      data: {
        userId: session.user.id,
        country: String(country).slice(0, 100),
        line1: String(line1).slice(0, 200),
        line2: line2 ? String(line2).slice(0, 200) : null,
        city: String(city).slice(0, 100),
        state: state ? String(state).slice(0, 100) : null,
        postalCode: String(postalCode).slice(0, 20),
      },
    });
  }

  return NextResponse.json({ address });
}
