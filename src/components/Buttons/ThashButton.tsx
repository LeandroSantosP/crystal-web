import React, { ButtonHTMLAttributes } from 'react';
import { Trash2 } from 'lucide-react';

interface TrashButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  absolute?: boolean;
}

export const TrashButton = ({ absolute = false, ...rest }: TrashButton) => {
  return (
    <button
      className={`${
        absolute && 'absolute'
      } right-1 top-1 rounded-3xl p-1 text-white/10 hover:bg-blackA9 hover:text-white/70`}
      {...rest}
    >
      <Trash2 />
    </button>
  );
};
