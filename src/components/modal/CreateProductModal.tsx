'use client';

import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import { ButtonAdm } from '../Buttons/ButtonAdm';
import { toMoney, toNumber } from 'vanilla-masker';
import * as Dialog from '@radix-ui/react-dialog';
import { Camera, CheckCheck } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Cookies from 'js-cookie';
import { api } from '@/lib/api';
import { ToastHook } from '../Toast';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingForm } from '../LoadingForm';
import { RadixCloseButton } from '@/components/RadixCloseButton';
import { FormatToDecimalToMoney } from '@/lib/FormaterToDecimal';

const form_data_schema = z.object({
  name: z.string().nonempty('Campo Obrigatório'),
  description: z.string().refine((value) => {
    return value.length >= 20;
  }, 'Descrição deve conter no minemo 20 caracteres'),
  price: z
    .string()
    .nonempty('Campo Obrigatório')
    .refine((value) => {
      return value !== 'R$ 0,00';
    }, 'Valor R$ 0,00 não e valido!')
    .transform((value) => {
      return FormatToDecimalToMoney(value);
    }),
  stoke: z
    .string()
    .nonempty('Campo Obrigatório')
    .refine((value) => {
      const amount = parseInt(value);
      return amount >= 10;
    }, 'Quantidade minima de 10')
    .transform((value) => Number(value)),
  weight: z
    .string()
    .nonempty('Campo Obrigatório')
    .transform((value) => {
      return parseInt(value);
    }),
  length: z
    .string()
    .nonempty('Campo Obrigatório')
    .transform((value) => {
      return parseInt(value);
    }),
  width: z
    .string()
    .nonempty('Campo Obrigatório')
    .transform((value) => {
      return parseInt(value);
    }),
  height: z
    .string()
    .nonempty('Campo Obrigatório')
    .transform((value) => {
      return parseInt(value);
    }),
});

type form_product_data = z.infer<typeof form_data_schema>;

export const CreateProductModal = ({ children }: { children: ReactNode }) => {
  const jwt = Cookies.get('token');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<form_product_data>({
    resolver: zodResolver(form_data_schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { ToastContainer, toast } = ToastHook({
    Icon: <CheckCheck />,
    theme: 'colored',
  });

  const [value, setValue] = useState<{ [key: string]: any }>({
    price: '',
    stoke: '',
    weight: '',
    height: '',
    width: '',
    length: '',
  });

  const [productImage, setProductImage] = useState<File>();
  const [previewFile, setPreviewFile] = useState<null | string>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldFormatters = {
      price: (value: string) => toMoney(value, { unit: 'R$' }),
      stoke: (value: string) => toNumber(value),
      height: (value: string) => toNumber(value),
      width: (value: string) => toNumber(value),
      weight: (value: string) => toNumber(value),
      length: (value: string) => toNumber(value),
    } as { [key: string]: any };

    const { name, value } = e.target;

    if (fieldFormatters.hasOwnProperty(name)) {
      const formatValue = fieldFormatters[name](value);
      setValue((prevValue) => ({
        ...prevValue,
        [name]: formatValue,
      }));
    }
  };
  const notify = () => toast.success('Produto criado com sucesso!');
  const notify_peddling = () => toast.warning('Aguarde, criando o produto!');

  useEffect(() => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
    const ACCEPTED_IMAGE_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
    ];
    if (productImage) {
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
    }
  }, [clearErrors, productImage, setError]);

  const onSubmit = async (data: form_product_data) => {
    if (!productImage) {
      setError('root', {
        message: 'Imagem do produto e obrigatória!',
      });
      return;
    }

    setIsLoading(() => true);
    notify_peddling();

    try {
      const formData = new FormData();

      formData.append('infos', JSON.stringify(data));
      formData.append('product_image', productImage);

      const response = await api.post('/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (response.status === 201) {
        notify();
        reset();
        setProductImage(undefined);
        setPreviewFile(null);
        setValue({
          price: '',
          stoke: '',
          weight: '',
          height: '',
          width: '',
          length: '',
        });
      }
    } catch (error) {
      // handling erros
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
        <Dialog.Content>
          {ToastContainer}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`fixed left-[50%]  top-[50%] flex h-full max-h-[650px] w-full max-w-[500px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
          >
            {isLoading && <LoadingForm />}
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
                  <p className="bold bottom-[-1px] text-sm text-gray-100">
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

            <fieldset className="relative  flex w-full flex-col gap-1 pb-[20px] text-red-400">
              <label
                className="text-start text-[15px] leading-relaxed text-emerald-400"
                htmlFor="description"
              >
                Specificacoes do produto!
              </label>

              <div className="flex w-full gap-2 overflow-hidden text-emerald-400">
                <div className="flex max-w-[100px] flex-col justify-center gap-2">
                  <label
                    className="text-xs font-medium text-white"
                    htmlFor="weight"
                  >
                    Peso (Kg)
                  </label>
                  <input
                    {...register('weight')}
                    onChange={(e) => handleChange(e)}
                    value={value.weight}
                    className="selection:color-white inline-flex h-[35px] appearance-none items-center  justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:shadow-[0_0_0_2px_black]"
                    id="weight"
                    type="text"
                  />
                  {errors.weight?.message ? (
                    <ErrorMessage xs>{errors.weight?.message}</ErrorMessage>
                  ) : (
                    <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                  )}
                </div>
                <div className="flex max-w-[110px]  flex-col justify-center gap-2">
                  <label
                    className="text-xs font-medium text-white"
                    htmlFor="length"
                  >
                    Comprimento (Cm)
                  </label>
                  <input
                    {...register('length')}
                    onChange={(e) => handleChange(e)}
                    value={value.length}
                    className="selection:color-white inline-flex h-[35px] appearance-none items-center  justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:shadow-[0_0_0_2px_black]"
                    id="length"
                    type="text"
                  />
                  {errors.length?.message ? (
                    <ErrorMessage xs={true}>
                      {errors.length?.message}
                    </ErrorMessage>
                  ) : (
                    <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                  )}
                </div>
                <div className="flex max-w-[100px]  flex-col justify-center gap-2">
                  <label
                    className="text-xs font-medium text-white"
                    htmlFor="width"
                  >
                    Largura (Cm)
                  </label>
                  <input
                    {...register('width')}
                    onChange={(e) => handleChange(e)}
                    value={value.width}
                    className="selection:color-white inline-flex h-[35px] appearance-none items-center  justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:shadow-[0_0_0_2px_black]"
                    type="text"
                    id="width"
                  />
                  {errors.width?.message ? (
                    <ErrorMessage xs={true}>
                      {errors.width?.message}
                    </ErrorMessage>
                  ) : (
                    <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                  )}
                </div>
                <div className="flex max-w-[110px]  flex-col justify-center gap-2">
                  <label
                    className="w-full text-xs font-medium text-white"
                    htmlFor="height"
                  >
                    Altura (Cm)
                  </label>
                  <input
                    {...register('height')}
                    onChange={(e) => handleChange(e)}
                    value={value.height}
                    className="selection:color-white inline-flex h-[35px] appearance-none items-center  justify-center rounded-[4px] bg-blackA5 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:shadow-[0_0_0_2px_black]"
                    type="text"
                    id="height"
                  />
                  {errors.height?.message ? (
                    <ErrorMessage xs={true}>
                      {errors.height?.message}
                    </ErrorMessage>
                  ) : (
                    <p className="absolute bottom-[-1px] text-sm text-blue-500" />
                  )}
                </div>
              </div>
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
            <RadixCloseButton />
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
