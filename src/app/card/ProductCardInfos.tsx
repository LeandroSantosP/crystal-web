export const ProductCardInfos = ({
  product_name,
  desc,
  label = 'White',
}: {
  product_name: string;
  desc: string;
  label?: string;
}) => {
  return (
    <div className="flex h-[1000px] flex-col gap-2 overflow-auto rounded border-2 border-gray-900 bg-gray-800 p-1">
      <h1 className="bg- text-xl font-semibold">{product_name}</h1>
      <span>{label}</span>span
      <span>{desc}</span>
    </div>
  );
};
