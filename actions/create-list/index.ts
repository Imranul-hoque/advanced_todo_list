"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateList } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    return {
      error: "Board Not Found",
    };
  }

  const lastList = await db.list.findFirst({
    where: {
      boardId: boardId,
    },
    orderBy: {
      order: "desc",
    },
    select: { order: true },
  });

  const lastOrder = lastList ? lastList.order + 1 : 1;

  let list;

  try {
    list = await db.list.create({
      data: {
        boardId: boardId,
        title: title,
        order: lastOrder,
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
