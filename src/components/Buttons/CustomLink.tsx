import { ReactNode } from 'react';
import LinkNext, { LinkProps } from 'next/link';

interface ButtonProps extends LinkProps {
  children: ReactNode;
  active?: boolean;
}

export const CustomLink = ({
  children,
  active = false,
  ...rest
}: ButtonProps) => {
  return (
    <LinkNext
      {...rest}
      className="relative flex h-14 w-[130px] items-center justify-center rounded-lg bg-gray-400 text-xl font-light text-white transition-colors hover:bg-gray-300"
    >
      {active && (
        <div className="absolute bottom-0 right-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-800 opacity-80" />
      )}
      {children}
    </LinkNext>
  );
};
