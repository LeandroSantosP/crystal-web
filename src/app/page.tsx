import Categories from '@/components/Categories/Categories';
import { ProductDivider } from '@/components/Divider';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { ToolBar } from '@/components/ToolBar';
import { Satellite } from 'lucide-react';
import React from 'react';

export default function Home() {
  return (
    <main className="flex grow flex-col items-center">
      <Hero />
      <section className="relative mt-3  flex w-full flex-1 flex-col items-center gap-5 rounded-lg bg-gray-800 p-3 text-gray-50">
        <ToolBar />
        {/* <ProductDivider content="Best Selling" Icon={<Satellite />} />
        <div className="grid max-h-[200px] w-full grid-cols-5 content-stretch gap-4 overflow-auto">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <ProductDivider content="Best Selling" Icon={<Satellite />} />
        <div className="grid max-h-[200px] w-full grid-cols-5 content-stretch gap-4 overflow-auto">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div> */}
        {/* @ts-ignore */}
        <Categories />
      </section>
    </main>
  );
}
