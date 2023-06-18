'use client';

import { HTMLAttributes } from 'react';

interface PlaceHolderProductCardProps extends HTMLAttributes<HTMLDivElement> {}

export const PlaceHolderProductCard = (params: { product_id: string }) => (
  <a
    href={`/product-details/${params.product_id}`}
    className="absolute flex h-[200px] w-full flex-col items-center rounded-lg text-sm hover:bg-white/10"
  />
);
