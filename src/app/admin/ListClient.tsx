import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { ListItem } from './ListItem';
import Image from 'next/image';

export interface UserCredentials {
  roles: string[];
  id: string;
  name: string;
  oauth_id: string;
  login: string;
  avatar_url: string;
  score: number;
  gender: string;
  created_at: string;
  updated_at: string;
}

export default async function ListClient() {
  const jwt = cookies().get('token')?.value;
  let data = [] as UserCredentials[];

  try {
    const response = await api.get('admin/list', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    data = response.data;
  } catch (error: any) {
    redirect('/api/auth/logout');
  }
  return (
    <>
      <div className="flex h-full max-h-[434px] max-w-sm grow-[2] flex-col gap-1 self-start rounded-md bg-gray-800 p-2">
        <div className="mb-2 flex w-full items-center justify-center rounded-sm bg-emerald-500 text-gray-800">
          <h1 className="bold font-semibold leading-relaxed">
            Listagem de Clients
          </h1>
        </div>

        <div className="scrollbar-thumb-gray-300 scrollbar-track-gray-100 flex flex-col gap-1 overflow-auto">
          {data.map((user: any) => (
            <>
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
              <ListItem key={user.id} user_infos={user} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
