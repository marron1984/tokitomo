export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { vaultItemId, action } = body;

  if (!vaultItemId) {
    return NextResponse.json(
      { error: "Missing vaultItemId" },
      { status: 400 }
    );
  }

  // Verify vault item exists
  const vaultItem = await prisma.vaultItem.findUnique({
    where: { id: vaultItemId },
  });
  if (!vaultItem) {
    return NextResponse.json(
      { error: "Vault item not found" },
      { status: 404 }
    );
  }

  if (action === "remove") {
    await prisma.wishlistItem.deleteMany({
      where: {
        userId: session.user.id,
        vaultItemId,
      },
    });
    return NextResponse.json({ wishlisted: false });
  }

  await prisma.wishlistItem.upsert({
    where: {
      userId_vaultItemId: {
        userId: session.user.id,
        vaultItemId,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      vaultItemId,
    },
  });

  return NextResponse.json({ wishlisted: true });
}
