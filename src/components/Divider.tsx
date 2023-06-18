'use client';
import { ReactNode, useEffect, useState } from 'react';

type ProductDividerProps = {
  content: string;
  Icon?: ReactNode;
  clickable?: boolean;
  handle_show?: (show: boolean) => any;
};

export const ProductDivider = ({
  content,
  Icon,
  handle_show,
  clickable = false,
}: ProductDividerProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (handle_show) {
      handle_show(show);
    }
  }, [handle_show, show]);

  return (
    <div
      className={`flex w-full items-center gap-3 px-2 ${
        clickable && 'hover:cursor-pointer hover:text-red-500'
      }`}
      onClick={() => setShow((prev) => !prev)}
    >
      <h2>{content}</h2>
      {Icon && Icon}
      <div className={`h-[1px] grow rounded-xl bg-black`} />
    </div>
  );
};
