import { getCredentials } from '@/lib/getCredentials';
import { LogOut } from 'lucide-react';

export const Profile = () => {
  const result = getCredentials();

  return (
    <div className="group flex h-full w-14 cursor-pointer rounded-full ">
      <a
        href="/api/auth/logout"
        className="bring-offset-2 flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border-dashed border-red-600	 group-hover:border-2 group-hover:bg-gray-600"
      >
        <p className="hidden text-red-600 group-hover:block">Sair</p>
        {/*// @ts-ignore */}
        <LogOut size={15} className="hidden text-red-600 group-hover:block" />
      </a>

      {/* eslint-disable-next-line */}
      <img
        className="rounded-full group-hover:hidden"
        src={result?.avatar_url}
        alt="avatar do perfil do usuário"
      />
    </div>
  );
};
