"use client"

import * as Dialog from '@radix-ui/react-dialog';
import React, { useState } from "react";
import { ButtonAdm } from "@/components/Buttons/ButtonAdm";
import { ADMProvider } from "@/shared/storage";
import Cookies from 'js-cookie';
import { RadixCloseButton } from "@/components/RadixCloseButton";


import { Trash2, Camera } from 'lucide-react';
import { ToastProvider } from "@/shared/storage/Toast/ToastProvider";
interface ConfirmeDeleteProductModalProps {
    product_name: string
    product_id: string
}

export const ConfirmeDeleteProductModal = ({ product_name, product_id }: ConfirmeDeleteProductModalProps) => {
    const jwt = Cookies.get('token');
    const { states: { toast   } } = ToastProvider();
    const [isOpen, setIsOPen] = useState(false)
    const { action: { handle_delete_product, getAllProducts },states: { error } } = ADMProvider();


    const notify = () => toast?.error('Cancelado!');
    const notify_product_already_deleted = () => toast?.error('Produto ja deletado!');
    const notify_success = () => toast?.success('Produto Deletado Com sucesso!');

    const handle_click = async (e: React.MouseEvent<HTMLButtonElement>) => {
     const name =  e.currentTarget.name
        if( name === "cancele") {
          notify()
            handle_modal()
          return;
      }

        if( error && error.statusCode === 400 && error.message === "Product not found!" ){
            notify_product_already_deleted()
            return
        }

        await handle_delete_product(product_id, jwt!)
        await getAllProducts();
        notify_success()
        handle_modal()

    }

    const handle_modal = () => {
        setIsOPen(prev => !prev)
    }


   return (
        <Dialog.Root open={isOpen}>
            <Dialog.Trigger onClick={handle_modal} className="absolute right-1 top-1 text-white/10 hover:bg-blackA9 hover:text-white/70 rounded-3xl p-1">
                    <Trash2 />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" onClick={handle_modal} />
                <Dialog.Content className="fixed left-[50%] gap-2 top-[50%] flex h-full max-h-[110px] w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none">
                        <h1 className="font-extrabold">Realmente Deseja Deletar o Procuto <span className="text-red-500">{product_name}</span></h1>
                        <div className="flex gap-3">
                            <ButtonAdm name="cancele" onClick={handle_click} my_color="red">Cancelar</ButtonAdm>
                            <ButtonAdm name="confirme" my_color="green" onClick={handle_click}>Confirmar</ButtonAdm>
                        </div>
                  <RadixCloseButton handle_close={handle_modal} />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}