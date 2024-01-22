import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!orgId || !userId) {
      return new NextResponse("Not found", { status: 400 });
    }

    const auditLogs = await db.auditLog.findMany({
      where: {
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
