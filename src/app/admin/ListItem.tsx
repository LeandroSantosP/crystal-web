'use client';

import { PopOverCustom } from '@/components/PopOver';
import { Crown } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { UserCredentials } from './ListClient';

interface ListItemProps {
  user_infos: UserCredentials;
}
const CrownRef = Crown as any;

export const ListItem = (params: ListItemProps) => {
  return (
    <PopOverCustom
      content={params.user_infos}
      target={
        <div className="flex h-10 w-full items-center gap-3 rounded-sm bg-gray-600  p-1 text-sm">
          <div className="flex flex-1 items-center  text-xs">
            <Image
              src={params.user_infos.avatar_url}
              width={35}
              height={35}
              alt="Foto do Client "
              className="rounded"
            />
            <h1 className="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-emerald-500">
              {params.user_infos.login}
            </h1>
          </div>
          <p>leandro@g...</p>
          <p>score {params.user_infos.score}</p>
          <p>ADM?</p>
          {/*// @ts-ignore */}
          <CrownRef
            className={`${
              params.user_infos.roles.includes('admin')
                ? 'text-yellow-500'
                : 'text-gray-50'
            }`}
          />
        </div>
      }
    />
  );
};
