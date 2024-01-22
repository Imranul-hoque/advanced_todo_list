"use client";

import { ListWithCards } from "@/@types";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
    data : ListWithCards
}

export const ListHeader = ({ data }: ListHeaderProps) => {
    
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const { execute } = useAction(updateList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" updated`)
            disableEditing();
        }
    })

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing()
        }
    }
    useEventListener("keydown", handleKeyDown)
    useOnClickOutside(formRef, disableEditing)

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;
        const listId = formData.get("listId") as string;

        if (title === data.title) {
            return disableEditing()
        }
        execute({ title, boardId, listId })
    }

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                ref={formRef}
                className="h-full w-full px-2 py-0.5"
            >
                <input
                    hidden
                    id="boardId"
                    name="boardId"
                    value={data.boardId}
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={data.id}
                />
                <FormInput
                    id="title"
                    placeholder="Enter list title..."
                    ref={inputRef}
                    defaultValue={data.title}
                    className="text-sm font-medium py-2 border-input focus:border-input"
                />
                <FormSubmit className="mt-3">
                    update
                </FormSubmit>
            </form>
        )
    }

    return (
        <div className="text-sm font-medium px-2 py-0.5">
            <div className="flex items-start justify-between">
            <button onClick={enableEditing}>
                {data.title}
                </button>
                <ListOptions data={data} onAdd={enableEditing} />
            </div>
        </div>
    )
}