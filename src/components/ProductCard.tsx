import Image from 'next/image';

import { TranslationCategories } from '@/lib/TranslateCategories';
import { Edit } from 'lucide-react';
import { EditProductModal } from './modal/EditProductModal';
import { ConfirmeDeleteProductModal } from '@/components/modal/ConfirmeDeleteProductModal';
import { StarNote } from '@/components/StartNote';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import { toMoney } from 'vanilla-masker';
import { AddCardButton } from '@/components/Buttons/AddCardButton';
import { PlaceHolderProductCard } from '@/components/PlaceHolderProductCard';
import { ProductCardProps } from '@/lib/ProductTypes';
export const ProductCard = ({
  product,
  adm = false,
}: {
  product: ProductCardProps;
  adm?: boolean;
}) => {
  const jwt = Cookies.get('token');

  let client_credentials;

  if (jwt) {
    client_credentials = decode(jwt) as { roles: string[] };
  }

  const number_format = toMoney(Number(product.price).toFixed(2), {
    unit: 'R$',
  });
  if (product.categories) {
    product.categories = TranslationCategories(product.categories);
  }
  return (
    <>
      <div className="relative flex h-[200px] w-full flex-col items-center rounded-lg bg-zinc-800 text-sm">
        <PlaceHolderProductCard product_id={product.id} />
        {product.images_paths[0] && (
          <Image
            src={product.images_paths[0]}
            alt="Imagem do produto"
            quality={100}
            width={300}
            height={300}
            className="aspect-video max-h-32 rounded-t-lg object-cover"
          />
        )}
        {client_credentials?.roles.includes('admin') && (
          <ConfirmeDeleteProductModal
            product_id={product.id}
            product_name={product.name}
          />
        )}
        <div className="flex w-full grow items-center justify-between px-2">
          <h1>{product.name}</h1>
          <div className="flex items-center gap-1">
            <StarNote note={Number(product.calc_average_ratings)} gap={1} />
            <span className="bold leading-relaxed">
              {product.calc_average_ratings}
            </span>
          </div>
        </div>
        <div className="flex w-full grow items-center justify-between px-2">
          <span className="font-thin leading-relaxed text-emerald-200">
            {number_format}
          </span>
          {!adm ? (
            <AddCardButton product_id={product.id} />
          ) : (
            <EditProductModal
              product={product}
              categories_names={product.categories}
            >
              <button className="z-[0] flex h-6 w-24 items-center justify-center gap-1 rounded bg-gray-800 text-xs shadow-sm shadow-black hover:bg-gray-600 hover:transition-colors">
                <Edit size={12} />
                Editar
              </button>
            </EditProductModal>
          )}
        </div>
      </div>
    </>
  );
};
