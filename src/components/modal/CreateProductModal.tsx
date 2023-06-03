'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Camera, X } from 'lucide-react';
import { ButtonAdm } from '../Buttons/ButtonAdm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toMoney, toNumber } from 'vanilla-masker';

import { z } from 'zod';
import { ErrorMessage } from '../ErrorMessage';
import { ChangeEvent, useEffect, useState } from 'react';

function FormaToDecimalToMoney(value: string) {
  const number = parseFloat(
    value.replace('R$ ', '').replace('.', '').replace(',', '.')
  ).toFixed(2);

  return Number(number);
}

const form_data_schema = z.object({
  name: z.string().nonempty('Campo Obrigatório'),
  description: z.string(),
  price: z
    .string()
    .nonempty('Campo Obrigatório')
    .refine((value) => {
      if (value === 'R$ 0,00') {
        return false;
      }
      return true;
    }, 'Valor R$ 0,00 não e valido!')
    .transform((value) => {
      return FormaToDecimalToMoney(value);
    }),
  stoke: z
    .string()
    .nonempty('Campo Obrigatório')
    .refine((value) => {
      const amount = parseInt(value);
      if (amount < 10) {
        return false;
      }
      return true;
    }, 'Quantidade minima de 10')
    .transform((value) => Number(value)),
});

type form_product_data = z.infer<typeof form_data_schema>;

export const CreateProductModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<form_product_data>({
    resolver: zodResolver(form_data_schema),
  });
  const [value, setValue] = useState<{ [key: string]: any }>({
    price: '',
    stoke: '',
  });
  const [productImage, setProductImage] = useState<File>();
  const [previewFile, setPreviewFile] = useState<null | string>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let format_value: string;
    if (e.target.name === 'price') {
      format_value = toMoney(e.target.value, {
        unit: 'R$',
      });
      setValue({ ...value, [e.target.name]: format_value });
      return;
    }

    format_value = toNumber(e.target.value);
    setValue({ ...value, stoke: format_value });
  };

  useEffect(() => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
    const ACCEPTED_IMAGE_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (!productImage) {
      setError('root', {
        message: 'Imagem do produto e obrigatória!',
      });
      return;
    }
    if (productImage.size >= MAX_FILE_SIZE) {
      setError('root', {
        message: 'A Imagem deve conter no máximo 5MB!',
      });
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(productImage.type)) {
      setError('root', {
        message: `Deve ser uma image no seguintes formatos! [${ACCEPTED_IMAGE_TYPES}]`,
      });
      return;
    }

    clearErrors('root');

    const previewURL = URL.createObjectURL(productImage);
    setPreviewFile(previewURL);
  }, [clearErrors, productImage, setError]);

  const onSubmit = (data: any) => {
    console.log(productImage);

    console.log({ ...data, productImage });
  };
  console.log(errors);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
        <Dialog.Content className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="fixed left-[50%] top-[50%] flex h-full max-h-[540px] w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none"
          >
            <Dialog.Title className="m-0 text-[17px] font-medium text-emerald-400">
              Criação de Produto
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal">
              Preencher todos os campos abaixo para criar um novo produto.
            </Dialog.Description>
            <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
              <label
                htmlFor="media"
                className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
              >
                {/*// @ts-ignore */}
                <Camera className="h-4 w-4" />
                Anexar imagem
                {'  '}
                {errors.root?.message && (
                  <p className=" bottom-[-1px] text-sm text-gray-100">
                    {errors.root?.message}
                  </p>
                )}
              </label>
              <input
                type="file"
                onChange={(e) => setProductImage(e.target.files?.[0])}
                id="media"
                className="invisible h-0 w-0"
              />

              <label className="text-start text-[15px]" htmlFor="name">
                Nome do Produto
              </label>

              <input
                {...register('name')}
                className="h-9 rounded-[4px] border-none bg-red-400 px-[10px] text-[15px] font-bold leading-none text-gray-950 shadow-[0_0_0_1px] outline-none focus:outline-red-500"
                id="name"
                placeholder="Smartphone"
              />
              {errors.name?.message ? (
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
              ) : (
                <p className="absolute bottom-[-1px] text-sm text-blue-500" />
              )}
            </fieldset>

            <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
              <label className="text-start text-[15px]" htmlFor="price">
                Preço
              </label>

              <input
                {...register('price')}
                onChange={(e) => handleChange(e)}
                value={value.price}
                className="h-9 rounded-[4px] border-none bg-red-400 px-[10px] text-[15px] font-bold leading-none text-gray-950 shadow-[0_0_0_1px] outline-none focus:outline-red-500"
                id="price"
                type="text"
                placeholder="R$ 200.00"
              />

              {errors.price?.message ? (
                <ErrorMessage>{errors.price?.message}</ErrorMessage>
              ) : (
                <p className="absolute bottom-[-1px] text-sm text-blue-500" />
              )}
            </fieldset>

            <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
              <label className=" text-start text-[15px]" htmlFor="stoke">
                Quantidade em Estoque
              </label>

              <input
                {...register('stoke')}
                onChange={(e) => handleChange(e)}
                value={value.stoke}
                className="h-9 rounded-[4px] border-none bg-red-400 px-[10px] text-[15px] font-bold leading-none text-gray-950 shadow-[0_0_0_1px] outline-none focus:outline-red-500"
                id="stoke"
                type="text"
                placeholder="10"
              />
              {errors.stoke?.message ? (
                <ErrorMessage>{errors.stoke?.message}</ErrorMessage>
              ) : (
                <p className="absolute bottom-[-1px] text-sm text-blue-500" />
              )}
            </fieldset>

            <fieldset className="relative flex w-full flex-col gap-1 pb-[20px] text-red-400">
              <label className="text-start text-[15px]" htmlFor="description">
                Descrição do Produto
              </label>

              <textarea
                {...register('description')}
                name="description"
                spellCheck={false}
                className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                placeholder="Forneça informações relevantes sobre a imagem do produto, como características, detalhes técnicos, materiais utilizados, etc."
              />
              {errors.description?.message ? (
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
              ) : (
                <p className="absolute bottom-[-1px] text-sm text-blue-500" />
              )}
            </fieldset>

            <ButtonAdm type="submit" my_color="green">
              Criar Produto
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
          {previewFile && (
            // eslint-disable-next-line
            <img
              src={previewFile}
              alt="preview da imagem"
              className="absolute right-4 top-[50%] aspect-video h-[210px] translate-y-[-50%] rounded-lg object-cover"
            />
          )}{' '}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
