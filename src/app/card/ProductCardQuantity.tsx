'use client';
import { ProductPrice } from '@/components/ProductPrice';
import { IncrementalButton } from '@/app/card/IncrementalButton';
import { useState } from 'react';

export const ProductCardQuantity = ({ product_id }: { product_id: string }) => {
  const [multiplayer, setMultiplayer] = useState(0);
  return (
    <div className="flex h-full">
      <div className="flex w-full justify-between self-end">
        <ProductPrice price={1000 * multiplayer} />
        <IncrementalButton
          product_id={product_id}
          callback={(quantity) => setMultiplayer(quantity)}
        />
      </div>
    </div>
  );
};
