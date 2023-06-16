import { Gem, Search, ShoppingCart } from 'lucide-react';
import { cookies } from 'next/headers';
import { Profile } from './Profile';
import { SingIn } from './SingIn';
import { ButtonsHeader } from './ButtonsHeader';
import { getCredentials } from '@/lib/getCredentials';

export const Header = () => {
  const isAuthenticated = cookies().has('token');

  const response = getCredentials();

  return (
    <header className="flex w-full items-center justify-between ">
      <div className="flex h-14 w-44 items-center gap-2 self-end rounded-lg bg-gray-400 pl-4 text-xl font-bold text-white">
        <Gem />
        crystal.
      </div>
      <ButtonsHeader roles={response?.roles} />
      <div className="relative">
        {/* @ts-ignore */}
        <Search className="absolute right-2 top-4 text-2xl text-gray-100" />
        <input
          type="text"
          className="border-1 h-14 rounded-lg border-gray-100 bg-gray-400 leading-relaxed text-gray-800"
        />
      </div>
      <button className="flex h-14 w-48 items-center justify-center gap-2 rounded-lg bg-emerald-600 text-white">
        <ShoppingCart />
        VIEW CART
      </button>
      {isAuthenticated ? <Profile /> : <SingIn />}
    </header>
  );
};
