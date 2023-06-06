'use client';

import 'react-toastify/dist/ReactToastify.css';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { ButtonAdm } from '../Buttons/ButtonAdm';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCheck, X } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { api } from '@/lib/api';
import { ToastHook } from '../Toast';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingForm } from '../LoadingForm';
import Cookies from 'js-cookie';

const form_data_schema = z.object({
  name: z.string().nonempty('Campo Obrigatório'),
  description: z.string().refine((value) => {
    if (value.length < 20) {
      return false;
    }
    return true;
  }, 'Descrição deve conter no minemo 20 caracteres'),
});

type form_category_data = z.infer<typeof form_data_schema>;

export const CreateCategoryModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const jwt = Cookies.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<form_category_data>({
    resolver: zodResolver(form_data_schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { ToastContainer, toast } = ToastHook({
    Icon: <CheckCheck />,
    theme: 'colored',
  });

  const notify = () => toast.success('Categoria criado com sucesso!');
  const notify_peddling = () => toast.warning('Aguarde, criando o categoria!');
  const notify_error = () => toast.error('Categoria ja Existente!');

  const onSubmit = async (data: form_category_data) => {
    setIsLoading(() => true);
    notify_peddling();
    try {
      const response = await api.post(
        '/category',
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      if (response.status === 201) {
        notify();
        clearErrors();
        reset();
      }
    } catch (error: any) {
      if (error.response.data.message === 'Category already exists') {
        notify_error();
        setError('name', {
          message: 'Categoria ja Existente!',
        });
      }
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
          <Dialog.Content>
            {ToastContainer}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={`fixed left-[50%] top-[50%] flex h-full max-h-[360px] w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
            >
              {isLoading && <LoadingForm />}
              <Dialog.Title className="m-0 text-[17px] font-medium text-emerald-400">
                Criação de Categoria
              </Dialog.Title>
              <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal">
                Preencher todos os campos abaixo para criar um novo Categoria.
              </Dialog.Description>
              <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
                <label className="text-start text-[15px]" htmlFor="name">
                  Nome do Categoria
                </label>

                <input
                  {...register('name')}
                  className="h-9 rounded-[4px] border-none bg-red-400 px-[10px] text-[15px] font-bold leading-none text-gray-950 shadow-[0_0_0_1px] outline-none focus:outline-red-500"
                  id="name"
                  placeholder="Sport"
                />
                {errors.name?.message ? (
                  <ErrorMessage>{errors.name?.message}</ErrorMessage>
                ) : (
                  <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                )}
              </fieldset>

              <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
                <label className="text-start text-[15px]" htmlFor="description">
                  Descrição do Categoria
                </label>

                <textarea
                  {...register('description')}
                  name="description"
                  spellCheck={false}
                  className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                  placeholder="Forneça informações relevantes sobre a Categoria, como características, detalhes do oque o client irar encontrar aqui, etc."
                />
                {errors.description?.message ? (
                  <ErrorMessage>{errors.description?.message}</ErrorMessage>
                ) : (
                  <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                )}
              </fieldset>

              <ButtonAdm type="submit" my_color="green">
                Criar Categoria
              </ButtonAdm>
              <Dialog.Close asChild>
                <button
                  className="hover:bg-violet4 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
