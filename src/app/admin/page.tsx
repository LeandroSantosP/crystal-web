import { getCredentials } from '@/lib/getCredentials';
import { ArrowUpNarrowWide } from 'lucide-react';
import { redirect } from 'next/navigation';
import Delivered from '../../assets/Delivered.svg';
import Cancelled from '../../assets/Cancelled.svg';
import Revenue from '../../assets/Revenue.svg';
import Order from '../../assets/Order.svg';
import { InfoCard } from '@/components/AdminComponents/InfoCard';
import ListClient from './ListClient';
import { AdminPainel } from '@/components/AdminPainel';
import { AdminPainelAside } from '@/components/AdminPainelAside';

export default async function Admin() {
  const result = getCredentials();

  if (!result?.roles.includes('admin')) {
    redirect('/');
  }

  return (
    <>
      {result?.roles.includes('admin') && (
        <section className="flex h-full flex-col gap-3 text-gray-800">
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
            <div className="flex h-full grow-[5] justify-center gap-1 rounded-md bg-teal-950 p-2">
              <AdminPainel />
              <AdminPainelAside />
            </div>
            {/* @ts-expect-error Server Component */}
            <ListClient />
          </section>
        </section>
      )}
    </>
  );
}
