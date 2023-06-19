'use client';
import { Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CardProvider } from '@/shared/storage';

export const IncrementalButton = ({
  product_id,
  callback,
}: {
  product_id: string;
  callback(quantity: number): unknown;
}) => {
  const {
    action: { add_item },
    states: { card },
  } = CardProvider();
  let initial_state = card.products.find(
    (product) => product.id === product_id
  );
  const [quantity, setQuantity] = useState(initial_state?.quantity || 0);

  const handle_change = (e: React.MouseEvent<HTMLButtonElement>) => {
    const current_button = e.currentTarget.name;
    if (current_button === 'plus') {
      setQuantity((current_count) => current_count + 1);
    } else if (current_button === 'minus' && quantity > 0) {
      setQuantity((current_count) => current_count - 1);
    }
  };

  useEffect(() => {
    add_item({ id: product_id, quantity });
    callback(quantity);
  }, [add_item, callback, product_id, quantity]);
  return (
    <div className="flex items-center justify-center gap-2">
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
        className="text-emerald-500"
        onClick={handle_change}
      >
        <Minus size={15} />
      </button>
    </div>
  );
};
