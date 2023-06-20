'use client';

import { ProductPrice } from '@/components/ProductPrice';
import React, { useEffect, useState } from 'react';
import { CardProvider } from '@/shared/storage/Card/CardProvider';
import { Plus, Minus } from 'lucide-react';

import { ProductCardProps } from '@/components/Categories/Categories';
import { TrashButton } from '@/components/Buttons/ThashButton';
import { ToastProvider } from '@/shared/storage';

export const ProductCardQuantity = ({
  product,
}: {
  product: ProductCardProps;
}) => {
  const {
    states: { card },
    action: { add_item, remove_item },
  } = CardProvider();
  const {
    states: { toast },
  } = ToastProvider();
  const delete_product_toast = () => toast?.warning('Produto removido!');

  let current_product = card.products.find((pro) => pro.id === product.id);
  const [quantity, setQuantity] = useState(current_product?.quantity || 0);
  let multiplayer = product.price * quantity;
  const handle_change = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current_button = e.currentTarget.name;
    if (current_button === 'plus') {
      setQuantity((current_count) => current_count + 1);
    } else if (current_button === 'minus' && quantity > 0) {
      setQuantity((current_count) => current_count - 1);
    }
  };

  useEffect(() => {
    if (!current_product) return;

    add_item({
      id: current_product.id,
      quantity: quantity,
    });
  }, [add_item, quantity]);
  const handle_delete_product = () => {
    if (!current_product) return;
    remove_item({ product_id: current_product.id });
    delete_product_toast();
  };

  return (
    <div className="flex h-full">
      <div className="flex w-full justify-between self-end transition-all">
        <ProductPrice price={multiplayer} />
        <div className="flex items-center gap-7">
          <TrashButton onClick={handle_delete_product} />
          <div className="flex items-center justify-center gap-2 ">
            <button
              type="button"
              name="plus"
              className="text-emerald-500"
              onClick={handle_change}
            >
              <Plus size={15} />
            </button>
            <span className="item w-7 text-center text-2xl">{quantity}</span>
            <button
              name="minus"
              type="button"
              className="text-red-500"
              onClick={handle_change}
            >
              <Minus size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
