import { ProductCardInfos } from '@/app/card/ProductCardInfos';
import { StarNote } from '@/components/StartNote';
import { ProductCardQuantity } from '@/app/card/ProductCardQuantity';
import Image from 'next/image';
import ImageTest from '@/assets/macbook.jpeg';

export const ProductCard = () => {
  return (
    <div className="flex min-h-[300px] w-full gap-3 rounded bg-gray-700">
      <div className="flex min-w-[300px]">
        <Image
          src={ImageTest}
          quality={100}
          height={300}
          width={300}
          alt={`Imagem do produto X`}
        />
      </div>

      <div className="flex flex-col gap-4 p-2">
        <ProductCardInfos />
        <StarNote
          note={Number(2)}
          star_size={30}
          custom_color="text-emerald-500 fill-emerald-500"
        />
        <ProductCardQuantity product_id={''} />
      </div>
    </div>
  );
};
