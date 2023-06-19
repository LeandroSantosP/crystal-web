'use client';

import { ProductDivider } from '@/components/Divider';
import { ScrollText } from 'lucide-react';
import { Evaluation } from '@/components/Evaluation';
import { useState } from 'react';
export const ProductEvaluations = () => {
  const [show, setShow] = useState(false);
  const handle_show = (value: boolean) => {
    setShow(value);
  };

  return (
    <>
      <ProductDivider
        clickable
        Icon={<ScrollText />}
        content={'Avaliacoees'}
        handle_show={handle_show}
      />
      {!show && <div className="flex max-h-full min-h-[200px] w-full grow" />}
      {show && <Evaluation />}
      {show && <Evaluation />}
    </>
  );
};