import { ReactNode } from 'react';

type ProductDividerProps = {
  content: string;
  Icon?: ReactNode;
};

export const ProductDivider = ({ content, Icon }: ProductDividerProps) => {
  return (
    <div className="flex w-full items-center gap-3 px-2">
      <h2>{content}</h2>
      {Icon && Icon}
      <div className="h-[1px] grow rounded-xl bg-black" />
    </div>
  );
};
