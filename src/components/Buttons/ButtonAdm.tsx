import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ButtonToolBar extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  my_color?: 'red' | 'blue' | 'green' | 'yellow' | 'black';
  active?: boolean;
}

export const ButtonAdm = React.forwardRef<HTMLButtonElement, ButtonToolBar>(
  ({ children, active = false, my_color = 'black', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full flex-1 rounded-md border-none text-sm hover:brightness-150 ${
          my_color === 'red'
            ? 'bg-red-600 text-gray-100'
            : my_color === 'blue'
            ? 'bg-blue-600 text-gray-800'
            : my_color === 'green'
            ? 'bg-green-600 text-gray-800'
            : my_color === 'yellow'
            ? 'bg-yellow-400 text-slate-950'
            : my_color === 'black'
            ? 'bg-gray-800 text-gray-100'
            : 'white'
        }  p-2`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ButtonAdm.displayName = 'ButtonAdm';
