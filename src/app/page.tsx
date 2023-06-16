import Categories from '@/components/Categories/Categories';
import { Hero } from '@/components/Hero';
import { ToolBar } from '@/components/ToolBar';
import React from 'react';

export default function Home() {
  return (
    <main className="flex grow flex-col items-center">
      <Hero />
      <section className="relative mt-3  flex w-full flex-1 flex-col items-center gap-5 rounded-lg bg-gray-800 p-3 text-gray-50">
        <ToolBar />
        {/* @ts-ignore */}
        <Categories />
      </section>
    </main>
  );
}
