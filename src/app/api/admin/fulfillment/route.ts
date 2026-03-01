export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/subscription";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { orderId, carrier, service, actualShippingCostUSD } = body;

  if (!orderId || actualShippingCostUSD === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const cost = Number(actualShippingCostUSD);
  if (isNaN(cost) || cost < 0) {
    return NextResponse.json({ error: "Invalid cost" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const fulfillmentCost = await prisma.fulfillmentCost.upsert({
    where: { orderId },
    update: {
      carrier: carrier ? String(carrier).slice(0, 100) : null,
      service: service ? String(service).slice(0, 100) : null,
      actualShippingCostUSD: cost,
    },
    create: {
      orderId,
      carrier: carrier ? String(carrier).slice(0, 100) : null,
      service: service ? String(service).slice(0, 100) : null,
      actualShippingCostUSD: cost,
    },
  });

  return NextResponse.json({ fulfillmentCost });
}
