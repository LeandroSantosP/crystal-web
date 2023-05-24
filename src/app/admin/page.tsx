import { getCredentials } from '@/lib/getCredentials';
import { ArrowUpNarrowWide, Crown } from 'lucide-react';
import { redirect } from 'next/navigation';
import Order from '../../assets/Order.svg';
import Delivered from '../../assets/Delivered.svg';
import Cancelled from '../../assets/Cancelled.svg';
import Revenue from '../../assets/Revenue.svg';
import { InfoCard } from '@/components/AdminComponents/InfoCard';
import { ListClient } from '@/components/AdminComponents/ListClient';

export default function Admin() {
  const result = getCredentials();

  if (result?.roles.includes('admin')) {
    redirect('/');
  }

  return (
    <section className="flex h-full flex-col items-center gap-3 text-gray-800">
      <section className="flex h-40 w-full gap-3">
        <InfoCard
          Logo={Order}
          LucideIcon={ArrowUpNarrowWide}
          complementes="4% (30 days)"
          title="Total Orders"
        />

        <InfoCard
          Logo={Cancelled}
          LucideIcon={ArrowUpNarrowWide}
          complementes="4% (30 days)"
          title="Total Orders"
        />

        <InfoCard
          Logo={Delivered}
          LucideIcon={ArrowUpNarrowWide}
          complementes="4% (30 days)"
          title="Total Orders"
        />

        <InfoCard
          Logo={Revenue}
          LucideIcon={ArrowUpNarrowWide}
          complementes="4% (30 days)"
          title="Total Orders"
        />
      </section>
      <section className="flex w-full flex-1 items-center gap-3 text-gray-100">
        <div className="flex h-full grow-[5] rounded-md bg-green-100 p-2">
          1
        </div>
        <ListClient />
      </section>
    </section>
  );
}
