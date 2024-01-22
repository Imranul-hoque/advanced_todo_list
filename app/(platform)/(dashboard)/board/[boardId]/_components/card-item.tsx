"use client";

import { Card } from "@prisma/client";
import { Draggable } from '@hello-pangea/dnd';
import { useCardModal } from "@/hooks/use-card-modal";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {

  const { onOpen} = useCardModal((state) => state);
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          onClick={() => onOpen(data.id)}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="truncate mb-2 border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm">
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
