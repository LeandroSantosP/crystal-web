import { api } from '@/lib/api';
import { Cpu, LayoutList, Satellite } from 'lucide-react';
import { Fragment } from 'react';
import { ProductDivider } from '../Divider';
import { ProductCard } from '../ProductCard';

interface Category {
  id: string;
  name: string;
  description: string;
  subCategories: [];
}
[];

export interface ProductCardProps {
  id: string;
  stoke: number;
  name: string;
  images: [];
  product_name: string;
  price: number;
  available: boolean;
  calc_average_ratings: number;
  evaluations: [];
}

export default async function Categories() {
  let categories: Category[] = [];
  try {
    const { data: categories_result } = await api.get('/category');
    categories = categories_result;
  } catch (error) {
    console.log({ error });
  }

  return (
    <>
      {categories.map(async (category) => {
        let products: ProductCardProps[] = [];

        const { data: product } = await api.get('/product/by-category', {
          params: {
            category_id: category.id,
            page: 1,
            per_page: 10,
          },
        });
        products = product;

        type ObjType = { [key: string]: any };

        const category_infos: ObjType = {
          names: {
            ['Unknown']: 'Desconhecida',
            ['Tecnologia']: 'Tecnologia',
          },
          icons: {
            ['Unknown']: <LayoutList />,
            ['Tecnologia']: <Cpu />,
          },
        };

        return (
          <Fragment key={category.id}>
            <ProductDivider
              content={category_infos['names'][category.name]}
              Icon={category_infos['icons'][category.name]}
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
