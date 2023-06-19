import { api } from '@/lib/api';
import { Category } from '@/components/Categories/Categories';
import ImageTest from '../../assets/macbook.jpeg';
import Image from 'next/image';
import React from 'react';
export default async function Categories() {
  const { data: categories } = await api.get<Category[]>('/category');
  return (
    <main className="grid h-auto grid-cols-3 content-stretch gap-10 rounded bg-gray-600 p-2">
      {categories.map((category) => {
        let a = (
          <>
            <a
              href={`/categories/${category.id}`}
              className="relative z-10 rounded outline outline-4 outline-emerald-500 transition-all hover:scale-[1.1] hover:cursor-pointer"
            >
              <div
                key={category.id}
                className="h-[400px] overflow-hidden rounded bg-red-400"
              >
                <Image
                  src={ImageTest}
                  className="h-full w-full object-cover"
                  alt="Image de capa da categoria"
                />
              </div>
              <div className="absolute bottom-1 left-4 flex h-auto w-[380px] flex-col items-center justify-center gap-2 rounded-xl bg-gray-800">
                <h1 className="text-3xl font-bold">{category.name}</h1>
                <p className="max-h-20 overflow-auto font-light text-emerald-600">
                  {category.description}
                </p>
              </div>
            </a>
          </>
        );
        return a;
      })}
    </main>
  );
}
