import { cookies } from 'next/headers';
import decode from 'jwt-decode';
import { redirect } from 'next/navigation';

interface User {
  sub: string;
  name: string;
  avatar_url: string;
  roles: string[];
}

export function getCredentials() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return;
  }

  const user = decode(token) satisfies User;

  return {
    ...user,
  };
}
