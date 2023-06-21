'use client';

import { api } from '@/lib/api';
import { ProductCardProps } from '@/components/Categories/Categories';
import { ProductDivider } from '@/components/Divider';
import { Box, ArrowBigRightDash, ArrowBigLeftDash } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { useEffect, useState } from 'react';
interface ProductsOfCategoryProps {
  params: {
    category_id: string;
  };
}
export default async function ProductsOfCategory({
  params,
}: ProductsOfCategoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const handle_next_page = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handle_previous_page = () => {
    setCurrentPage((prev) => prev - 1);
  };


  const { data: products } = await api.get<ProductCardProps[]>(
    '/product/by-category',
    {
      params: {
        category_id:params?.category_id,
        page: currentPage,
        per_page: 20,
      },
    }
  );

  const categories = await api.get<any[]>('/category');

  const { name: category_name } = categories.data.find(
    (category) => category.id === params?.category_id
  );

  return (
    <main className="m-full flex h-full flex-col gap-2">
      <ProductDivider content={category_name} Icon={<Box />} />
      <div className="grid max-h-[490px] w-full grid-cols-5 content-stretch gap-4 overflow-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="flex h-full w-full items-center justify-center rounded bg-gray-700">
          <h1 className="text-2xl font-bold text-white">
            Nunhum Produto encontrado!
          </h1>
        </div>
      )}
      <div className="flex justify-between gap-60">
        <button
          className={`flex w-52 justify-center rounded-md border-2 border-gray-700 bg-gray-800 p-2
          ${currentPage === 1 ? 'opacity-70' : ''}`}
          type="button"
          onClick={handle_previous_page}
          disabled={currentPage === 1}
        >
          <ArrowBigLeftDash />
        </button>
        <button
          className={`flex w-52 justify-center rounded-md border-2 border-gray-700 bg-gray-800 p-2 ${
            products.length === 0 ? 'opacity-70' : ''
          }`}
          disabled={products.length === 0}
          type="button"
          onClick={handle_next_page}
        >
          <ArrowBigRightDash />
        </button>
      </div>
    </main>
  );
}
