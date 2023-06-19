import Image from 'next/image';
import ImageTest from '../../assets/avatar.jpg';
import { ProductPrice } from '@/components/ProductPrice';
import { StarNote } from '@/components/StartNote';
import { ProductCardInfos } from '@/app/card/ProductCardInfos';
import { ProductCardQuantity } from '@/app/card/ProductCardQuantity';
import { ProductCard } from '@/app/card/ProdcutCard';
//catainer pai tem h-full e overflow-hidden, e o cantainer filho tem h-full e overflow-auto

export default function Card() {
  return (
    <main className="m-full flex h-full overflow-hidden">
      <section className="flex w-full flex-1 flex-col p-2">
        <header className="mb-3 flex">
          <h1 className="text-3xl font-semibold">
            Aqui estao seu item do carinho!
          </h1>
        </header>
        <div className="m flex h-full w-full flex-col gap-6 overflow-auto">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
      <div className="h-ful w-1 rounded bg-gray-700" />
      <section className="flex min-w-[400px] p-2">test</section>
    </main>
  );
}
