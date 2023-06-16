import * as Dialog from "@radix-ui/react-dialog";
import React from "react";
import { X } from 'lucide-react';


interface RadixCloseButtonProps {
    handle_close?: () => void
}

export const RadixCloseButton = ({ handle_close }: RadixCloseButtonProps)=>{
    return (
        <Dialog.Close asChild onClick={handle_close}>
            <button
                className="hover:bg-violet4 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
            >
                <X />
            </button>
        </Dialog.Close>
    )
}