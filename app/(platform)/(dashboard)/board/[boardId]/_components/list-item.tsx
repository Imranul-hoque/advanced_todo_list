"use client";

import { ListWithCards } from "@/@types";
import { cn } from "@/lib/utils";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { ListHeader } from "./list-header";

import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-[272px] rounded-md shrink-0 bg-[#f1f2f4] h-full p-2"
        >
          <div {...provided.dragHandleProps}>
            <ListHeader data={data} />

            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <div
                    className={cn(
                      "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                      data.cards.length > 0 ? "mt-2" : "mt-0"
                    )}
                  />

                  <div>
                    {data.cards.map((card, index) => (
                      <CardItem index={index} key={card.id} data={card} />
                    ))}
                  </div>

                  <CardForm
                    listId={data.id}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                    ref={textareaRef}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};
