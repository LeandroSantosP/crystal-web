import Image from 'next/image';

import { ProductCardInfos } from '@/app/card/ProductCardInfos';
import { StarNote } from '@/components/StartNote';
import { ProductCardQuantity } from '@/app/card/ProductCardQuantity';
import { ProductCardProps } from '@/lib/ProductTypes';

export const ProductCard = ({ product }: { product: ProductCardProps }) => {
  let formatter_label = `Specificacoes do producto: peso ${product.product_specification.weight}Km, largura: ${product.product_specification.width}cm, altura: ${product.product_specification.height}cm, comprimento: ${product.product_specification.length}cm`;

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
          label={formatter_label}
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
