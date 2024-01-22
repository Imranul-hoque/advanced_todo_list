"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { useState, useRef, ElementRef } from 'react';
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";


export const ListForm = () => {

    const inputRef = useRef<ElementRef<"input">>(null);
    const formRef = useRef<ElementRef<"form">>(null);
    const params = useParams();
    const { execute } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List ${data.title} is created`)
            disableEditing();
        },
        onError: (error) => {
            toast.error(error)
        },
    })

    const [isEditing, setIsEditing] = useState<boolean>(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({ title, boardId })
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form action={onSubmit} ref={formRef} className="p-3 w-full h-full  rounded-md space-y-3 shadow-md bg-white">
                    <FormInput
                        id="title"
                        ref={inputRef}
                        className="text-sm px-2 py-2 h-7 font-medium border-transparent focus:border-input hover:border-input transition"
                        placeholder="Enter list title..."
                    />
                    <input
                        hidden
                        id="boardId"
                        name="boardId"
                        value={params.boardId}
                    />
                    <div className="flex items-center gap-x-2">
                        <FormSubmit>
                            Add
                        </FormSubmit>
                        <Button onClick={disableEditing} variant={"ghost"} size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
              onClick={enableEditing}  
             className="w-full rounded-md p-3 bg-white/80 hover:bg-white/50 transition text-sm font-medium flex items-center"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add
            </button>
        </ListWrapper>
    )
}