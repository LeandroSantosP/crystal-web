'use client';

import { ProductDivider } from '@/components/Divider';
import { ScrollText } from 'lucide-react';
import { Evaluation } from '@/components/Evaluation';
import { useState } from 'react';
import { Evaluations } from '@/lib/ProductTypes';

export interface EvaluationProps {
  client_avatar: string;
  created_at: string;
  description: string;
  id: string;
  note: number;
}
export const ProductEvaluations = ({
  evaluations,
}: {
  evaluations: EvaluationProps[];
}) => {
  const [show, setShow] = useState(true);
  return (
    <div className="overflow-auto">
      <ProductDivider
        clickable
        Icon={<ScrollText />}
        content={'Avaliacoes'}
        handle_show={setShow}
      />

      {!show && <div className="flex min-h-[200px] w-full grow" />}
      <div className="flex h-full w-full flex-col gap-10">
        {show &&
          evaluations.map((evaluation) => (
            <Evaluation key={evaluation.id} evaluation={evaluation} />
          ))}
      </div>
    </div>
  );
};
