'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { CheckBox } from '@/components/CheckBox';
import { ShoppingCart } from 'lucide-react';
import { CardInputs } from '@/app/card/CardInputs';
import { ProductCardProps } from '@/lib/ProductTypes';
import { ProductPrice } from '@/components/ProductPrice';

import { calculate_total_price } from '@/app/card/CalculateTotalPrice';
import { CardProvider, card_type } from '@/shared/storage/Card/CardProvider';
import { MySelect } from '@/components/MySelect';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { User } from '@/lib/getCredentials';
import { format, set } from 'date-fns';
import { LoadingForm } from '../LoadingForm';
import { toMoney } from 'vanilla-masker';
import { ToastProvider } from '@/shared/storage';
import { redirect } from 'next/navigation';

export const OrderModal = ({
  card,
  products,
}: {
  products: ProductCardProps[];
  card: card_type;
}) => {
  const {
    states: { toast },
  } = ToastProvider();
  const {
    action: { confirm, SimulateConfirm },
    states: { loading },
  } = CardProvider();
  const [freight, setFreight] = useState<number>(0);
  const jwt = Cookies.get('token');

  const {
    products: product_on_card,
    total_format,
    total,
  } = calculate_total_price(products, card);

  const order_approved = () => toast?.success('Pedido aceito com sucesso!');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!jwt) return;
    const formData = new FormData(event.currentTarget);
    const freight = formData.get('freight') as string;

    const { sub: client_id } = decode(jwt) as User;
    const data = new Date();
    const order_date = format(data, 'yyyy-MM-dd');

    const data_request = {} as { [key: string]: any };

    data_request.freight_type = freight;
    data_request.client_id = client_id;
    data_request.order_date = order_date;
    data_request.products = card.products;

    const res = await confirm({
      ...data_request,
      products: data_request.products,
    });
    if (res) {
      redirect('/');
      order_approved();
    }
  };

  const SimulateFreight = useCallback(
    async (freight_type: string) => {
      const res = await SimulateConfirm(freight_type, card.products);
      setFreight(res!.total);
    },
    [SimulateConfirm, card.products]
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger
        asChild
        className="flex w-full flex-1 items-center justify-center gap-4 rounded bg-emerald-700 text-3xl font-semibold text-gray-100 hover:bg-emerald-500/20"
      >
        <div>
          <ShoppingCart size={40} />
          CheckOut
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
        <Dialog.Content>
          {loading && <LoadingForm />}
          <form
            className={`fixed left-[50%] top-[50%] flex h-full max-h-[600px] w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
            onSubmit={onSubmit}
          >
            <Dialog.Title className="m-0 text-[37px] font-medium text-emerald-400">
              CheckOut
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-semibold tracking-wider text-white">
                    Payment
                  </h1>
                  <span className="text-sm">
                    todos seus dispositivos com nossos para celular.
                  </span>
                </div>
                <div className="flex h-20 w-full items-center gap-5 rounded-xl bg-blackA9 p-3">
                  <CheckBox
                    id={'ideia'}
                    name={'ideia'}
                    text={'Credits'}
                    value={'ideia'}
                  />
                  <div className="flex flex-col">
                    <span>Use Metafy Credits!</span>
                    <span className="text-xs">
                      todos seus dispositivos com nossos
                    </span>
                  </div>
                </div>
                <CardInputs />
              </div>
              <div className="flex h-full max-h-96 flex-col gap-2 overflow-auto rounded-xl p-5 outline outline-2 outline-blackA10">
                <div className="o verflow-auto flex h-full flex-col gap-2 rounded bg-blackA9 p-2">
                  {product_on_card.map(({ product, quantity }) => {
                    return (
                      <div
                        key={product.id}
                        className="flex items-center justify-between rounded-md bg-gray-700 p-1"
                      >
                        <p className="text-xs">{product.name}</p>

                        <div className="flex gap-1">
                          <ProductPrice
                            color={'text-emerald-400'}
                            price={product.price * quantity}
                            text_size={'text-xs'}
                          />
                          X{quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex w-full items-center justify-between gap-2 rounded bg-gray-800 p-2">
                  <MySelect
                    label
                    name="freight"
                    label_text="Frete"
                    callback={(e) => SimulateFreight(e)}
                    options={[
                      { text: 'padrao', value: 'default' },
                      { text: 'express', value: 'express' },
                    ]}
                    default_value={'default'}
                  />
                  <div className="flex flex-col text-xs">
                    <p className={'border-b'}>Produtos</p>
                    <p className="self-end"> {total_format}</p>
                    <p className={'border-b'}>Frete:</p>
                    <p className="self-end">
                      {toMoney(freight.toFixed(2), { unit: 'R$' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full ">
              <div className="flex h-20 w-full flex-col items-center justify-between self-end p-2">
                <button
                  type="submit"
                  className="flex w-36 flex-col items-center self-end rounded bg-gray-900 p-2"
                >
                  Total{' '}
                  <ProductPrice price={total + freight} text_size="text-s" />
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
