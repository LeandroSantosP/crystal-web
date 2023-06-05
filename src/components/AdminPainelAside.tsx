'use client';

import { ADMProvider } from '@/shared/storage';
import { ButtonAdm } from './Buttons/ButtonAdm';
import { CreateCategoryModal } from './modal/CreateCategoryModal';
import { CreateProductModal } from './modal/CreateProductModal';
import { MySelect } from './MySelect';

export const AdminPainelAside = () => {
  const {
    action: { setCurrentPage },
  } = ADMProvider();

  const options = [
    { value: 'products', text: 'Produto' },
    { value: 'categories', text: 'Categorias' },
  ];

  return (
    <aside className="max-w flex max-w-[170px] grow-[1] flex-col gap-2 rounded-md bg-zinc-400/20 p-1 ">
      <MySelect options={options} callback={setCurrentPage} />
      <CreateProductModal>
        <ButtonAdm>Cadastro de Produto</ButtonAdm>
      </CreateProductModal>
      <CreateCategoryModal>
        <ButtonAdm>Cadastro de Categoria</ButtonAdm>
      </CreateCategoryModal>
      <ButtonAdm>Cadastro de Produto</ButtonAdm>
    </aside>
  );
};
