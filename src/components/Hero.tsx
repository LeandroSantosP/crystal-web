import Image from 'next/image';
import Start from '../assets/start.svg';

export const Hero = () => {
  return (
    <>
      <section className="relative flex h-64 w-full flex-col items-center justify-center rounded-lg bg-gray-800 text-gray-50">
        <Image src={Start} alt="estrela" className="absolute" />
        <div className="z-2 absolute m-5 flex h-[90%] w-[98%] rounded-lg border-2 border-emerald-600" />
        <div className="flex w-full flex-1 items-center px-6">
          <h1 className="bold font-alt text-7xl">Explore our Shop</h1>
        </div>
        <div className="z-2 flex w-full flex-1 items-center justify-end">
          <div className="mr-48 max-w-[500px]">
            <p className="items-center font-light">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur, aliquam. Dolorum, deserunt vero ducimus debitis error
              eum dicta quis ea? Id sunt quo aperiam quae asperiores distinctio
              a voluptates et? nsectetur, aliquam. Dolorum, deserunt vero
              ducimus debitis error
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
