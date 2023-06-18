import { Header } from '@/components/Header';
import './globals.css';
import { Karla, Bai_Jamjuree } from 'next/font/google';
import { ToastPlaceHolder } from '@/components/ToastPlaceHolder';

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
});

const BaiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${BaiJamjuree.variable} ${karla.variable} min-h-screen bg-gray-900 text-gray-100`}
      >
        <ToastPlaceHolder />
        <div className="m-auto flex h-screen max-w-[1368px] flex-col gap-3 p-4 text-gray-200">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
