import { ProductCardProps } from '@/lib/ProductTypes';
import { card_type } from '@/shared/storage/Card/CardProvider';
import { toMoney } from 'vanilla-masker';

interface result_props {
  total_format: string;
  total: number;
  products: Array<{ product: ProductCardProps; quantity: number }>;
}
export const calculate_total_price = (
  products: ProductCardProps[],
  card: card_type
) => {
  let total = 0;
  let result = {
    total_format: '',
    products: [],
    total: 0,
  } as result_props;

  for (let index = 0; index < card.products.length; index++) {
    const current_product = card.products[index];
    const original_product = products.find(
      (prod) => prod.id === current_product.id
    );
    if (!original_product) continue;

    const sub_total = original_product.price * current_product.quantity;

    total += sub_total;
    result.products.push({
      quantity: current_product.quantity,
      product: original_product,
    });
  }
  result.total = total;
  result.total_format = toMoney(total.toFixed(2), { unit: 'R$' });
  return result;
};
