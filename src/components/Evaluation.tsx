import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { EvaluationProps } from '@/components/ProductEvaluations';

export const Evaluation = ({ evaluation }: { evaluation: EvaluationProps }) => {
  let dataObj = parseISO(evaluation.created_at);
  let dateFormatter = format(dataObj, 'MMM dd, yyyy');
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="min-h-[120px] min-w-[80px]">
        <Image
          className="mt-2 h-20 w-20 rounded-full bg-red-600 group-hover:hidden"
          width={20}
          height={20}
          src={evaluation.client_avatar}
          alt="avatar do perfil do usuário"
        />
      </div>

      <div className="h-full w-full">
        <h2 className="text-lg font-semibold">{evaluation.description}</h2>
        <span className="font-light">{dateFormatter}</span>
        <p>{evaluation.description}</p>
      </div>
    </div>
  );
};
