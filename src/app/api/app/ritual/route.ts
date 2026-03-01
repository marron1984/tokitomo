import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const weekNumber = Number(body.weekNumber);

  if (!weekNumber || weekNumber < 1 || weekNumber > 52) {
    return NextResponse.json(
      { error: "Invalid week number" },
      { status: 400 }
    );
  }

  const progress = await prisma.ritualProgress.upsert({
    where: {
      userId_weekNumber: {
        userId: session.user.id,
        weekNumber,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      weekNumber,
    },
  });

  return NextResponse.json({ progress });
}
