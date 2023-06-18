import Image from 'next/image';
import ImageTest from '@/assets/macbook.jpeg';

export const Evaluation = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="min-h-[120px] min-w-[80px]">
        <Image
          className="mt-2 h-20 w-20 rounded-full bg-red-600 group-hover:hidden"
          src={ImageTest}
          alt="avatar do perfil do usuário"
        />
      </div>

      <div className="h-full w-full">
        <h2 className="text-lg font-semibold">Leandro Santos</h2>
        <span className="font-light">Dec 26, 2019</span>
        <p>
          etur adipiscing elit. Quis pellentesque tellus imperdiet mattis. Proin
          in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit Proin
          in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit Proin
          in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit Proin
          in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit Proin
          in quis ipsum non amet imperdiet. Dignissim nisi leo a at. Sit nec
          lacus, nunc volutpat, tincidunt lorem mi duis. Vitae element
        </p>
      </div>
    </div>
  );
};
