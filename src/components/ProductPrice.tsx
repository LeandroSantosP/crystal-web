import { toMoney } from 'vanilla-masker';

export const ProductPrice = ({
  price,
  text_size = 'text-2xl',
  color = 'text-red-500',
}: {
  price: number;
  text_size?: string;
  color?: string;
}) => {
  return (
    <p
      className={`flex items-center gap-1 ${text_size} font-normal leading-relaxed ${color}`}
    >
      {toMoney(price.toFixed(2), { unit: 'R$' })}
    </p>
  );
};
