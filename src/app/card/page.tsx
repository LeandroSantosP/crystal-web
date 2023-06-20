'use client';

import { ProductCard } from '@/app/card/ProdcutCard';
import Image from 'next/image';
import { ShoppingCart, Home } from 'lucide-react';
import { toMoney } from 'vanilla-masker';
import { useEffect, useState } from 'react';
import { ADMProvider, CardProvider } from '@/shared/storage';
import { ProductCardProps } from '@/components/Categories/Categories';
import { card_type } from '@/shared/storage/Card/CardProvider';
import { PinCount } from '@/components/PinCount';
import { OrderModal } from '@/components/modal/OrderModal';

//catainer pai tem h-full e overflow-hidden, e o cantainer filho tem h-full e overflow-auto

export default function Card() {
  const {
    states: { product_list },
    action: { getAllProducts },
  } = ADMProvider();
  const {
    states: { card },
  } = CardProvider();
  const [productOnCard, setProductOnCard] = useState<ProductCardProps[]>([]);
  const [total, setTotal] = useState('');

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  useEffect(() => {
    const products = [];
    for (const card_product of card.products) {
      const card_product_found = product_list.find(
        (curr) => curr.id === card_product.id
      );
      if (card_product_found) {
        products.push(card_product_found);
      }
    }
    setProductOnCard(products);
    calculate_total(products, card);
  }, [card, product_list]);

  const calculate_total = (products: ProductCardProps[], card: card_type) => {
    let total = 0;
    for (const card_product of card.products) {
      const current_product = products.find(
        (product) => product.id === card_product.id
      );
      if (!current_product) return;
      const sub_total = current_product.price * card_product.quantity;
      total += sub_total;
    }
    const formatter_total = toMoney(total.toFixed(2), { unit: 'R$' });
    setTotal(formatter_total);
  };
  return (
    <main className="m-full flex h-full overflow-hidden">
      <section className="flex w-full flex-1 flex-col p-2">
        <header className="mb-3 flex">
          <h1 className="text-3xl font-semibold">
            Aqui estao seus items do carinho!
          </h1>
        </header>
        <div className="m flex h-full w-full flex-col gap-6 overflow-auto">
          {productOnCard.length === 0 && (
            <div className="m-1 flex h-full flex-col items-center justify-center gap-2 rounded bg-gray-500 text-xl ">
              Ainda nenhum produto no seu carrinho!
              <a href="/" className="flex gap-2 rounded-md bg-emerald-700 p-3">
                <Home /> Home
              </a>
            </div>
          )}
          {productOnCard?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
      <div className="h-ful w-1 rounded bg-gray-700" />
      <section className="flex min-w-[300px] flex-col justify-between ">
        <div className="grid min-h-[300px] grid-cols-2 gap-2 overflow-auto p-2">
          {productOnCard.map((product) => {
            const prod = card.products.find((acc) => acc.id === product.id);
            return (
              <div
                className="relative h-[150px] w-[150px] object-cover"
                key={product.id}
              >
                {prod?.quantity && <PinCount count={prod.quantity} />}
                <Image
                  alt="test"
                  src={product.images[0]}
                  height={150}
                  className="h-full w-full object-cover"
                  width={150}
                  quality={100}
                />
              </div>
            );
          })}
        </div>
        <div className="flex min-h-[100px] w-full flex-col self-end p-2">
          <span className="text-white">Card Total {total}</span>
          <OrderModal>
            <button className="flex w-full flex-1 items-center justify-center gap-4 rounded bg-emerald-700 text-3xl font-semibold text-gray-100 hover:bg-emerald-500/20">
              <ShoppingCart size={40} />
              CheckOut
            </button>
          </OrderModal>
        </div>
      </section>
    </main>
  );
}
