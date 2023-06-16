'use client';

import 'react-toastify/dist/ReactToastify.css';
import {FormEvent, ReactNode} from 'react';
import { ButtonAdm } from '../Buttons/ButtonAdm';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCheck, Trash2 } from 'lucide-react';
import { ToastHook } from '../Toast';
import { LoadingForm } from '../LoadingForm';
import Image from 'next/image';

import { Categories_Formatted_return } from '@/lib/TranslateCategories';
import { CategoryADMCard } from '../CategoryADMCard';
import { CheckBox } from '../CheckBox';
import { ProductCardProps } from '../Categories/Categories';
import { ADMProvider } from '@/shared/storage';
import { CategoryProvider } from '@/shared/storage/Categories/CategoryProvider';
import Cookie from 'js-cookie';
import { RadixCloseButton } from "@/components/RadixCloseButton";

interface EditProductModalProps {
  children: ReactNode;
  categories_names: Categories_Formatted_return;
  product: ProductCardProps;
}

export const EditProductModal = ({
  children,
  product,
  categories_names,
}: EditProductModalProps) => {

  const jwt = Cookie.get('token');

  const {
    action: { set_category_product, handle_reset_categories, getAllProducts },
    states: { loading: product_edit_loading },
  } = ADMProvider();
  const {
    action: { getAllCatagories },
    states: { category_list, loading },
  } = CategoryProvider();

  const { ToastContainer, toast } = ToastHook({
    Icon: <CheckCheck />,
    theme: 'colored',
    timer: 2000,
  });

  const ResetCategories = ToastHook({
    Icon: <Trash2 />,
    theme: 'dark',
    timer: 2000,
  });

  const notify = () => toast.success('Produto editando com sucesso!');
  const notify_delete_categories = () => ResetCategories.toast.success('Categorias Resetadas com sucesso!');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    for (const pair of formData.entries()) {
      const [_, value] = pair;

      const category_registered = categories_names.some(
        (category) => category.original_name === value
      );

      if (!category_registered && jwt && value !== 'unmarked') {
        await set_category_product({
          category_name: value as string,
          product_id: product.id,
          jwt,
          is_add_category: true,
        });
      }
    }

    notify();
    await getAllProducts()
    await getAllCatagories();
  };

  const reset_categories = async () => {
    await handle_reset_categories(product.id);
    await getAllProducts()
    notify_delete_categories()
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
          <Dialog.Content>
            {ToastContainer}
            {ResetCategories.ToastContainer}
            <form
              onSubmit={onSubmit}
              className={`fixed left-[50%] top-[50%] flex h-full max-h-[600px] w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
            >
              {loading || product_edit_loading ? <LoadingForm /> : ''}
              <Dialog.Title className="m-0 text-[17px] font-medium text-emerald-400">
                Edição de produto
              </Dialog.Title>
              <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal">
                Preencher todos os campos abaixo para Salvar um novo produto.
              </Dialog.Description>
              <section className=" flex h-full gap-1 pb-[20px] text-gray-50">
                <Image
                  src={product.images_paths[0]}
                  alt="imagem de teste"
                  width={300}
                  height={300}
                  quality={100}
                  className="bottom-2 max-h-[310px] rounded-md border-red-600 object-cover"
                />
                <fieldset className="flex flex-col gap-1 rounded-md bg-zinc-700 p-2">
                  <div className="flex flex-col">

                  <label className="text-start text-[15px]" htmlFor="name">
                    Categorias Cadastrada
                  </label>


                    <div className="flex max-h-20  w-[420px] gap-2">
                      <div className="flex overflow-auto grow-[1] gap-1 rounded-md bg-emerald-500 p-2">
                        {categories_names.map(({ name }) => {
                          return <CategoryADMCard key={name} content={name} />;
                        })}
                      </div>
                      <button className="bg-blackA9 rounded-md p-1" type="button" onClick={reset_categories}>Resetar</button>
                    </div>
                  </div>

                  <label className="text-start text-[15px]" htmlFor="name">
                    Categorias disponíveis
                  </label>
                  <div className="grid max-h-[200px] grid-cols-3 gap-3 overflow-auto p-1">
                    {category_list.map(({ name }) => {
                      const res = categories_names.find(
                        (category) => category.original_name === name
                      );

                      return (
                        <CheckBox
                          key={name}
                          id={name}
                          name={name}
                          defaultChecked={!!res}
                          text={res?.name || name}
                          value={name}
                        />
                      );
                    })}
                  </div>
                </fieldset>
              </section>

              <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
                <label className="text-start text-[15px]" htmlFor="description">
                  Descrição do produto
                </label>

                <textarea
                  spellCheck={false}
                  className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                  placeholder="Forneça informações relevantes sobre a produto, como características, detalhes do oque o client irar encontrar aqui, etc."
                />
              </fieldset>

              <ButtonAdm type="submit" my_color="green">
                Salvar produto
              </ButtonAdm>
              <RadixCloseButton />
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
