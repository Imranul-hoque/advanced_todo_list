"use client";

import { ListWithCards } from "@/@types";
import { useEffect, useState } from "react";
import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";


import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { toast } from "sonner";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(lists: T[], startIndex: number, endIndex: number) {
  const result = Array.from(lists);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success("List reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => {
      toast.success("Card reordered");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setOrderedList(data);
  }, [data]);

  const onDrag = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items = reorder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setOrderedList(items);
      executeUpdateListOrder({ items, boardId });
    }
    if (type === "card") {
      let newOrderedData = [...orderedList];
 
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const newCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        newCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = newCards;
        setOrderedList(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: newCards,
        });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedList(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDrag}>
      <Droppable direction="horizontal" droppableId="lists" type="list">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex items-start flex-wrap gap-2"
          >
            {orderedList.map((list, i) => {
              return <ListItem index={i} key={list.id} data={list} />;
            })}
            <ListForm />
            {provided.placeholder}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
