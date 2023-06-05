'use client';

import { ADMProvider } from '@/shared/storage';
import { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCarSkeleton } from './skeletons/ProductCarSkeleton';

export const ProductsList = () => {
  const {
    action: { getAllProducts },
    states: { product_list, loading },
  } = ADMProvider();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <>
      <div className="grid max-h-[420px] max-w-[700px] grid-cols-3 content-stretch  gap-3 overflow-auto">
        {Array.from({ length: 20 }).map((_, index) => {
          if (loading) {
            return <ProductCarSkeleton key={index} />;
          }
        })}
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
