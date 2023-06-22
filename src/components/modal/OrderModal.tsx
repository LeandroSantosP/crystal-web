import * as Dialog from '@radix-ui/react-dialog';
import { CheckBox } from '@/components/CheckBox';
import { ShoppingCart } from 'lucide-react';
import { CardInputs } from '@/app/card/CardInputs';
import { ProductCardProps } from '@/lib/ProductTypes';
import { ProductPrice } from '@/components/ProductPrice';
import { calculate_total_price } from '@/app/card/CalculateTotalPrice';
import { card_type } from '@/shared/storage/Card/CardProvider';
import { MySelect } from '@/components/MySelect';
export const OrderModal = ({
  card,
  products,
}: {
  products: ProductCardProps[];
  card: card_type;
}) => {
  const {
    products: product_on_card,
    total_format,
    total,
  } = calculate_total_price(products, card);
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
          <form
            className={`fixed left-[50%] top-[50%] flex h-full max-h-[600px] w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
          >
            <Dialog.Title className="m-0 text-[37px] font-medium text-emerald-400">
              CheckOut
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-5">
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
              <div className="flex h-full max-h-96 flex-col gap-2 overflow-hidden rounded-xl p-5 outline outline-2 outline-blackA10">
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
                    label_text="Frete"
                    callback={(e) => console.log(e)}
                    options={[
                      { text: 'padrao', value: 'default' },
                      { text: 'express', value: 'express' },
                    ]}
                    default_value={'default'}
                  />
                  <div className="flex flex-col gap-1">
                    <p className={' border-b'}>Total</p>
                    <p className="self-end"> {total_format}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-full ">
              <div className="flex h-20 w-full flex-col items-center justify-between self-end p-2">
                <button className="flex w-36 flex-col items-center self-end rounded bg-gray-900 p-2">
                  Pay <ProductPrice price={total} text_size="text-s" />
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
