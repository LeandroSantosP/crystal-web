'use client';

import { ADMProvider } from '@/shared/storage';
import { CategoryProvider } from '@/shared/storage/Categories/CategoryProvider';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard';

export const ProductsList = () => {
  const {
    action: { getAllProducts },
    states: { product_list },
  } = ADMProvider();

  const {
    action: { getAllCatagories },
  } = CategoryProvider();

  useEffect(() => {
    getAllCatagories();
    getAllProducts();
  }, [getAllCatagories, getAllProducts]);

  return (
    <>
      <div className="grid grid-cols-3 content-stretch gap-1 overflow-auto">
        {product_list.map((product) => {
          return (
            <ProductCard
              product={{
                images_paths: product.images,
                ...product,
              }}
              adm={true}
              key={product.id}
            />
          );
        })}
      </div>
    </>
  );
};
