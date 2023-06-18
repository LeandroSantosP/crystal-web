'use client';
import { XSquare } from 'lucide-react';

import { PlusSquare } from 'lucide-react';
import { CardProvider, ToastProvider } from '@/shared/storage';
import { useEffect, useState } from 'react';
import { ButtonAdm } from '@/components/Buttons/ButtonAdm';

export const AddCardButton = ({
  product_id,
  button_type_2 = false,
}: {
  product_id: string;
  button_type_2?: boolean;
}) => {
  const [productAlreadyRegister, setProductAlreadyRegister] = useState(false);
  const {
    states: { toast, toast_settings },
  } = ToastProvider();
  const {
    action: { add_item, remove_item },
    states: { card },
  } = CardProvider();

  const handle_add_item = () => {
    add_item({ id: product_id, quantity: 1 });
    toast?.success('Item Adicionado com succeso!');
  };

  const handle_remove_item = () => {
    remove_item({ product_id });
    toast?.warning('Item Removido com succeso!');
  };

  useEffect(() => {
    const product_already_in_card = card.products?.some(
      (product) => product.id == product_id
    );
    setProductAlreadyRegister(product_already_in_card);
  }, [card, product_id]);

  return (
    <>
      {!button_type_2 ? (
        <button
          onClick={
            !productAlreadyRegister ? handle_add_item : handle_remove_item
          }
          className={`z-[0] flex h-6 items-center justify-center gap-1 rounded text-[10px] ${
            productAlreadyRegister
              ? 'bg-red-800 hover:bg-red-600'
              : 'bg-gray-800 hover:bg-gray-600'
          } p-1 text-xs shadow-sm shadow-black  hover:transition-colors`}
        >
          {productAlreadyRegister ? (
            <>
              <XSquare size={12} />
              Remover Do Carinho{' '}
            </>
          ) : (
            <>
              <PlusSquare size={12} />
              Adicionar no Carrinho
            </>
          )}
        </button>
      ) : (
        <ButtonAdm
          my_color={productAlreadyRegister ? 'red' : 'green'}
          onClick={
            !productAlreadyRegister ? handle_add_item : handle_remove_item
          }
        >
          {productAlreadyRegister ? (
            <>Remover Do Carinho</>
          ) : (
            <>Adicionar no Carrinho</>
          )}
        </ButtonAdm>
      )}
    </>
  );
};
