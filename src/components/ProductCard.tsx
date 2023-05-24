import { PlusSquare, Star } from 'lucide-react';
import Image from 'next/image';
import MacImage from '../assets/macbook.jpeg';

export const ProductCard = () => {
  return (
    <div className="flex h-[200px] w-full flex-col items-center rounded-lg bg-zinc-800 text-sm">
      <Image
        src={MacImage}
        alt="mac"
        className="aspect-video max-h-32 rounded-t-lg object-cover"
      />
      <div className="flex w-full grow items-center justify-between px-2">
        <h1>MacBook</h1>
        <div className="flex items-center gap-1">
          <Star size={10} />
          <Star size={10} />
          <Star size={10} />
          <Star size={10} />
          <span className="bold leading-relaxed">4.5</span>
        </div>
      </div>
      <div className="flex w-full grow items-center justify-between px-2">
        <span className="font-thin leading-relaxed text-emerald-200">
          $23.233
        </span>
        <button className="flex h-6 w-24 items-center justify-center gap-1 rounded bg-gray-800 text-xs shadow-sm shadow-black hover:bg-gray-600 hover:transition-colors">
          <PlusSquare size={12} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};
