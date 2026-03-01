export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/subscription";
import { sendShippingNotificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id || !(await isAdmin(session.user.email))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { orderId, trackingNumber, carrier } = body;

  if (!orderId || !trackingNumber || !carrier) {
    return NextResponse.json(
      { error: "orderId, trackingNumber, and carrier are required" },
      { status: 400 }
    );
  }

  // Update order with tracking info
  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "shipped",
      shippedAt: new Date(),
      trackingNumber,
    },
    include: {
      user: { select: { email: true, name: true } },
    },
  });

  // Send shipping notification email
  if (order.user.email) {
    try {
      await sendShippingNotificationEmail(
        order.user.email,
        order.user.name,
        trackingNumber,
        carrier,
        order.month
      );
    } catch (e) {
      console.error("Failed to send shipping notification email:", e);
    }
  }

  return NextResponse.json({ success: true, order });
}
