import Image from 'next/image';
import { StarNote } from '@/components/StartNote';

import { ProductEvaluations } from '@/components/ProductEvaluations';
import { AddCardButton } from '@/components/Buttons/AddCardButton';
import { api } from '@/lib/api';

export default async function ProductDetails({
  params,
}: {
  params: { product_id: string };
}) {
  const product = await api.get(`/product/${params.product_id}`);

  return (
    <main className="flex h-full flex-col gap-3 overflow-hidden bg-gray-700 p-2">
      <div className="flex gap-7 ">
        <div className="flex items-center justify-center rounded-md bg-gray-700 p-2">
          <Image
            src={product.data.Image[0]}
            alt="Imagen do Produto"
            quality={100}
            width={342}
            height={342}
            className="h-[302px] w-[342px] rounded-md object-cover"
          />
        </div>
        <div className="flex w-[541px] flex-col gap-4">
          <div>
            <h1 className="text-6xl font-semibold text-white">
              {product.data.name}
            </h1>
            <span className="text-3xl text-white">Edicao epecial!</span>
          </div>
          <div className="justify-centerc flex items-center">
            <StarNote
              custom_color="text-emerald-500 fill-emerald-500"
              note={product.data.calc_average_ratings}
              star_size={30}
              gap={1}
            />
            <span className="ml-2 text-2xl text-white">2 / 5</span>
          </div>
          <div>
            <p className="flex items-center gap-1 text-2xl font-normal leading-relaxed text-red-500">
              <span className="text-3xl">R$</span> {product.data.price}
            </p>
            <p>{product.data.description}</p>
          </div>
          <AddCardButton product_id={product.data.id} button_type_2 />
        </div>
      </div>
      <ProductEvaluations evaluations={product.data.evaluation} />
    </main>
  );
}
