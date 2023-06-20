import { toMoney } from 'vanilla-masker';

export const ProductPrice = ({ price }: { price: number }) => {
  console.log();
  return (
    <p className="flex items-center gap-1 text-2xl font-normal leading-relaxed text-red-500">
      {toMoney(price.toFixed(2), { unit: 'R$' })}
    </p>
  );
};
