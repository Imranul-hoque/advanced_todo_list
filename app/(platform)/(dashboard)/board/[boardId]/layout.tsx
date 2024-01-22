import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";
import { notFound, redirect } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata(
    { params }: {
        params: { boardId: string }
    }
) {
    const { orgId } = auth();

    if (!orgId) {
        return redirect("/select-org")
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    });

    return {
        title : startCase(board?.title || "Board")
    }

}


export default async function BoardLayout(
    {
        children,
        params
    }:
        {
            children: React.ReactNode,
            params : { boardId : string }
    }
) {

    const { orgId } = auth();

    if (!orgId) {
        notFound();
    }

    const board = await db.board.findUnique({
        where: {
            id: params.boardId,
            orgId
        }
    });

    if (!board) {
        notFound();
    }

    return (
        <div
            className="h-full bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage : `url(${board.imageFullUrl})` }}
        >
          <BoardNavbar data={board} />
        <div className="pt-20 h-full">{children}</div>
      </div>
    );
    
}