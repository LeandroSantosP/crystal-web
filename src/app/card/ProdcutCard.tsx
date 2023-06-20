import Image from 'next/image';

import { ProductCardInfos } from '@/app/card/ProductCardInfos';
import { StarNote } from '@/components/StartNote';
import { ProductCardQuantity } from '@/app/card/ProductCardQuantity';
import { ProductCardProps } from '@/components/Categories/Categories';

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  return (
    <div className="flex max-h-4 min-h-[300px] w-full gap-3 rounded  bg-gray-700">
      <div className="flex">
        <Image
          src={product.images[0]}
          quality={100}
          height={400}
          width={400}
          className="h-full w-full object-cover"
          alt={`Imagem do produto ${product.product_name}`}
        />
      </div>
      <div className="relative  m-2 flex w-full flex-col gap-7 rounded bg-gray-500 p-2">
        <ProductCardInfos
          product_name={product.name}
          desc={product.description}
        />
        <StarNote
          note={Number(product.calc_average_ratings)}
          star_size={30}
          custom_color="text-emerald-500 fill-emerald-500"
        />
        <ProductCardQuantity product={product} />
      </div>
    </div>
  );
};
