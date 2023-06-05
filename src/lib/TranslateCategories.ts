export type Categories_Formatted = { name: string; description: string }[];

export type Categories_Formatted_return = {
  name: string;
  description: string;
  original_name: string;
}[];

export function TranslationCategories(
  categories_data: Categories_Formatted
): Categories_Formatted_return {
  const names = [] as Categories_Formatted_return;

  for (const { name, description } of categories_data) {
    switch (name) {
      case 'Unknown':
        names.push({
          name: 'Desconhecida',
          description,
          original_name: name,
        });
        break;
      case 'Sport':
        names.push({
          name: 'Sport',
          description,
          original_name: name,
        });
        break;
      case 'Tecnologia':
        names.push({
          name: 'Tecnologia',
          description,
          original_name: name,
        });
        break;

      default:
        names.push({
          name,
          original_name: name,
          description,
        });
    }
  }

  return names;
}
