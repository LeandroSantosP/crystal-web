import Image from 'next/image';
import ImageTest from '../../../assets/macbook.jpeg';
import { StarNote } from '@/components/StartNote';

import { ProductEvaluations } from '@/components/ProductEvaluations';
import { AddCardButton } from '@/components/Buttons/AddCardButton';

export default function ProductDetails({
  params,
}: {
  params: { product_id: string };
}) {
  return (
    <main className="flex h-full flex-col gap-3 overflow-hidden bg-gray-700 p-2">
      <div className="flex gap-7">
        <div className="flex items-center justify-center rounded-md bg-gray-700 p-2">
          <Image
            src={ImageTest}
            alt="Imagen do Produto"
            quality={100}
            width={342}
            className="h-[302px] w-[342px] rounded-md object-cover"
          />
        </div>
        <div className="flex h-[424px] w-[541px] flex-col gap-4">
          <div>
            <h1 className="text-6xl font-semibold text-white">Mac Book</h1>
            <span className="text-3xl text-white">Edicao epecial!</span>
          </div>
          <div className="justify-centerc flex items-center">
            <StarNote
              custom_color="text-emerald-500 fill-emerald-500"
              note={2}
              star_size={30}
              gap={1}
            />
            <span className="ml-2 text-2xl text-white">2 / 5</span>
          </div>
          <div>
            <p className="flex items-center gap-1 text-2xl font-normal leading-relaxed text-red-500">
              <span className="text-3xl">R$</span> 1000
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis
              pellentesque tellus imperdiet mattis. Proin in quis ipsum non amet
              imperdiet. Dignissim nisi leo a at. Sit nec lacus, nunc volutpat,
              tincidunt lorem mi duis. Vitae elementum libero. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Quis pellentesque tellus
              imperdiet mattis. Proin in quis ipsum non amet imperdiet.
              Dignissim nisi leo a at. Sit nec lacus, nunc volutpat, tincidunt
              lorem mi duis. Vitae elementum libero.
            </p>
          </div>
          <AddCardButton product_id={'1'} button_type_2 />
        </div>
      </div>
      <ProductEvaluations />
    </main>
  );
}
