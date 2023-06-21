'use client';
import { ReactNode, useEffect, useState } from 'react';

type ProductDividerProps = {
  content: string;
  Icon?: ReactNode;
  clickable?: boolean;
  handle_show?: (value: any) => void;
};

export const ProductDivider = ({
  content,
  Icon,
  handle_show,
  clickable = false,
}: ProductDividerProps) => {
  return (
    <div
      className={`flex w-full items-center gap-3 px-2 ${
        clickable && 'hover:cursor-pointer hover:text-red-500'
      }`}
      onClick={() => handle_show && handle_show((prev: boolean) => !prev)}
    >
      <h2>{content}</h2>
      {Icon && Icon}
      <div className={`h-[1px] grow rounded-xl bg-black`} />
    </div>
  );
};
