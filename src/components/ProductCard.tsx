import { PlusSquare, Star } from 'lucide-react';
import Image from 'next/image';
import MacImage from '../assets/macbook.jpeg';
import { ProductCardProps } from './Categories/Categories';

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  const number_format = product.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <div className="flex h-[200px] w-full flex-col items-center rounded-lg bg-zinc-800 text-sm">
      <Image
        src={MacImage}
        alt="mac"
        className="aspect-video max-h-32 rounded-t-lg object-cover"
      />
      <div className="flex w-full grow items-center justify-between px-2">
        <h1>{product.name}</h1>
        <div className="flex items-center gap-1">
          <Star size={10} />
          <Star size={10} />
          <Star size={10} />
          <Star size={10} />
          <span className="bold leading-relaxed">
            {product.calc_average_ratings}
          </span>
        </div>
      </div>
      <div className="flex w-full grow items-center justify-between px-2">
        <span className="font-thin leading-relaxed text-emerald-200">
          $ {number_format}
        </span>
        <button className="flex h-6 w-24 items-center justify-center gap-1 rounded bg-gray-800 text-xs shadow-sm shadow-black hover:bg-gray-600 hover:transition-colors">
          <PlusSquare size={12} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
