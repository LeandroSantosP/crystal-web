export const ProductPrice = ({ price }: { price: number }) => (
  <p className="flex items-center gap-1 text-2xl font-normal leading-relaxed text-red-500">
    <span className="text-3xl">R$</span> {price}
  </p>
);
