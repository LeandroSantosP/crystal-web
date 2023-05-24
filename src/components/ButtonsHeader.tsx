'use client';

import { usePathname } from 'next/navigation';
import { CustomLink } from './Buttons/CustomLink';

export const ButtonsHeader = ({ roles }: { roles: string[] | undefined }) => {
  const currentPage = usePathname();

  return (
    <>
      <CustomLink href="/" active={currentPage === '/'}>
        shop
      </CustomLink>
      {roles?.includes('comum') && (
        <CustomLink href="/admin" active={currentPage === '/admin'}>
          Admin
        </CustomLink>
      )}
      <CustomLink href="/" active={currentPage === '/collection'}>
        collection
      </CustomLink>
      <CustomLink href="/" active={currentPage === '/contact'}>
        contact
      </CustomLink>
    </>
  );
};
