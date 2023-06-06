'use client';

import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect } from 'react';
import { ButtonAdm } from '../Buttons/ButtonAdm';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCheck, X } from 'lucide-react';
import { z } from 'zod';

import { api } from '@/lib/api';
import { ToastHook } from '../Toast';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingForm } from '../LoadingForm';
import Image from 'next/image';
import { Categories_Formatted_return } from '@/lib/TranslateCategories';
import { CategoryADMCard } from '../CategoryADMCard';
import { CheckBox } from '../CheckBox';
import { ProductCardProps } from '../Categories/Categories';
import { ADMProvider } from '@/shared/storage';
import { CategoryProvider } from '@/shared/storage/Categories/CategoryProvider';
import Cookie from 'js-cookie';
const form_data_schema = z.object({
  name: z.string().nonempty('Campo Obrigatório'),
  description: z.string().refine((value) => {
    if (value.length < 20) {
      return false;
    }
    return true;
  }, 'Descrição deve conter no minemo 20 caracteres'),
});

interface EditProductModalProps {
  children: React.ReactNode;
  categories_names: Categories_Formatted_return;
  product: ProductCardProps;
}

export const EditProductModal = ({
  children,
  product,
  categories_names,
}: EditProductModalProps) => {
  const jwt = Cookie.get('token');

  const router = useRouter();

  const {
    action: { set_category_product },
    states: { loading: product_edit_loading },
  } = ADMProvider();
  const {
    action: { getAllCatagories },
    states: { category_list, loading },
  } = CategoryProvider();

  const { ToastContainer, toast } = ToastHook({
    Icon: <CheckCheck />,
    theme: 'colored',
    timer: 300,
  });

  const notify = () => toast.success('Produto editando com sucesso!');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    for (const pair of formData.entries()) {
      const [key, value] = pair;

      const category_registered = categories_names.some(
        (category) => category.original_name === value
      );

      if (!category_registered && jwt && value !== 'unmarked') {
        await set_category_product({
          category_name: value as string,
          product_id: product.id,
          jwt,
        });
      }
    }
    // try {
    //   const response = await api.post('/product', {
    //     ...data,
    //   });

    //   if (response.status === 201) {
    //     notify();
    //   }
    // } catch (error: any) {
    //   if (error.response.data.message === 'product already exists') {
    //     notify_error();
    //   }
    // } finally {
    //   setIsLoading(() => false);
    // }
    notify();
    getAllCatagories();
  };

  useEffect(() => {}, [getAllCatagories]);
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
          <Dialog.Content>
            {ToastContainer}
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

              <section className="relative flex h-full w-full gap-1 pb-[20px] text-gray-50">
                <Image
                  src={product.images_paths[0]}
                  alt="imagem de teste"
                  width={300}
                  height={300}
                  quality={100}
                  className="bottom-2 rounded-md border-red-600 object-cover"
                />
                <fieldset className="flex  w-full flex-col gap-1 rounded-md bg-gray-700 p-2">
                  <label className="text-start text-[15px]" htmlFor="name">
                    Categorias Cadastradas
                  </label>
                  <div className="flex max-h-20 w-full grow-[1] gap-1 rounded-md bg-emerald-500 p-2">
                    {categories_names.map(({ name }) => {
                      return <CategoryADMCard key={name} content={name} />;
                    })}
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
                          defaultChecked={res ? true : false}
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
              <Dialog.Close asChild>
                <button
                  className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                  aria-label="Close"
                >
                  <X />
                </button>
              </Dialog.Close>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
