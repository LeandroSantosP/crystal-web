import { InputHTMLAttributes } from 'react';

interface CardInput extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  value: string;
}
export const CardInput = ({ id, value, ...rest }: CardInput) => {
  return (
    <input
      className="selection:color-white h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
      id={id}
      value={value}
      {...rest}
    />
  );
};
