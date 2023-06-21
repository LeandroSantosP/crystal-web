import { api } from '@/lib/api';
import { Cpu, Dumbbell, LayoutList, Box } from 'lucide-react';
import { Fragment } from 'react';
import { ProductDivider } from '../Divider';
import { ProductCard } from '../ProductCard';
import { Category, ProductCardProps } from '@/lib/ProductTypes';

async function get_products_by_category_id(category_id: string) {
  const { data: products } = await api.get<ProductCardProps[]>(
    '/product/by-category',
    {
      params: {
        category_id,
        page: 1,
        per_page: 10,
      },
    }
  );
  return products;
}

export default async function Categories() {
  const { data: categories } = await api.get<Category[]>('/category');

  return (
    <>
      {categories.map(async (category) => {
        const products = await get_products_by_category_id(category.id);

        type ObjType = { [key: string]: any };

        const category_infos: ObjType = {
          names: {
            ['Unknown']: 'Desconhecida',
            ['Tecnologia']: 'Tecnologia',
            ['Sport']: 'Sport',
          },
          icons: {
            ['Unknown']: <LayoutList />,
            ['Tecnologia']: <Cpu />,
            ['Sport']: <Dumbbell />,
          },
        };

        if (products.length === 0 || products.length <= 2) return;

        return (
          <Fragment key={category.id}>
            <ProductDivider
              content={category_infos['names'][category.name] || category.name}
              Icon={category_infos['icons'][category.name] || <Box />}
            />
            <div className="grid max-h-[200px] w-full grid-cols-5 content-stretch gap-4 overflow-auto">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
