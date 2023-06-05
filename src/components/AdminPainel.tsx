'use client';

import { ADMProvider } from '@/shared/storage';
import { ProductsList } from './ProductList';

export const AdminPainel = () => {
  const {
    states: { current_page },
  } = ADMProvider();

  const page_component: { [key: string]: JSX.Element } = {
    products: <ProductsList />,
  };

  return (
    <div className="flex grow-[5] justify-center rounded-md bg-gray-700 p-1">
      {current_page && page_component[current_page]}
    </div>
  );
};
