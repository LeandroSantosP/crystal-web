import Image from 'next/image';
import FormLoading from '../assets/FormLoading.svg';

export const LoadingForm = () => {
  return (
    <div className="fixed  inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-800/90">
      <Image src={FormLoading} alt="Loading" height={100} width={100} />
    </div>
  );
};
