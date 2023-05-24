import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonToolBar extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

export const ButtonToolBar = ({
  children,
  active = false,
  ...rest
}: ButtonToolBar) => {
  return (
    <button
      className="rounded-md border-2 border-gray-700 bg-gray-800 p-2"
      {...rest}
    >
      {children}
    </button>
  );
};
