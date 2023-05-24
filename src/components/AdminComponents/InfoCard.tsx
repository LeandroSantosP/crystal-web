import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface InfoCardProps {
  amount?: number;
  title: string;
  complementes: string;
  LucideIcon: LucideIcon;
  Logo: any;
}

export const InfoCard = ({
  Logo,
  LucideIcon,
  complementes,
  title,
  amount = 0,
}: InfoCardProps) => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-md bg-gray-600">
      <div className="flex items-center gap-4">
        <Image src={Logo} width={100} height={100} alt="" />
        <div>
          <h1 className="bold font-alt text-5xl leading-tight text-gray-50">
            {amount}
          </h1>
          <span className="text-gray-100">{title}</span>
          <div className="flex text-emerald-700">
            <LucideIcon />
            <span>{complementes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
