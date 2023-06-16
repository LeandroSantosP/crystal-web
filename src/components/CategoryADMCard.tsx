interface CategoryADMCardProps {
  content: string;
  color?: string;
}

export const CategoryADMCard = (params: CategoryADMCardProps) => (
  <div className="flex flex-1 items-center justify-center rounded-md bg-gray-500 p-1 text-sm">
    {params.content}
  </div>
);
