'use client';

import { ADMProvider } from '@/shared/storage';
import { CategoryProvider } from '@/shared/storage/Categories/CategoryProvider';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard';

export const ProductsList = () => {
  const {
    action: { getAllProducts },
    states: { product_list, loading },
  } = ADMProvider();
  const {
    action: { getAllCatagories },
    states: { category_list },
  } = CategoryProvider();

  useEffect(() => {
    getAllCatagories();
    getAllProducts();
  }, [getAllCatagories, getAllProducts]);

  return (
    <>
      <div className="grid max-h-[420px] max-w-[700px] grid-cols-3 content-stretch  gap-3 overflow-auto">
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
