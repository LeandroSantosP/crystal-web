import { Crown } from 'lucide-react';

import Order from '../../assets/Order.svg';
import Image from 'next/image';

export const ListClient = () => {
  return (
    <div className="flex h-full max-w-sm grow-[2] flex-col items-center gap-3 overflow-auto rounded-md bg-gray-800 p-2">
      <div className="flex h-7 w-full items-center justify-center rounded-sm bg-emerald-500 text-gray-800">
        <h1 className="bold font-semibold leading-relaxed">
          Listagem de Clients
        </h1>
      </div>
      <div className="flex h-10 w-full items-center gap-3 rounded-sm bg-gray-600 p-1 text-sm">
        <div className="flex flex-1 items-center gap-5">
          <Image src={Order} width={35} height={35} alt="Foto do Client" />
          <h1 className="text-emerald-500">Leandro</h1>
          <h2>leandro@g...</h2>
          <p>score 0</p>
        </div>
        <p>ADM?</p>
        {/*// @ts-ignore */}
        <Crown className="text-yellow-500" />
      </div>
      <div className="flex h-10 w-full items-center gap-3 rounded-sm bg-gray-600 p-1 text-sm">
        <div className="flex flex-1 items-center gap-5">
          <Image src={Order} width={35} height={35} alt="Foto do Client" />
          <h1 className="text-emerald-500">Leandro</h1>
          <h2>leandro@g...</h2>
          <p>score 0</p>
        </div>
        <p>ADM?</p>
        {/*// @ts-ignore */}
        <Crown className="text-yellow-500" />
      </div>
    </div>
  );
};
