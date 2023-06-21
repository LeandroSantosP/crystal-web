export interface Category {
  id: string;
  name: string;
  description: string;
  subCategories: [];
}

export interface Evaluations {
  id: string;
  note: number;
  description: string;
}

export interface ProductCardProps {
  id: string;
  stoke: number;
  name: string;
  images: string[];
  Image: string[];
  images_paths: string[];
  description: string;
  product_name: string;
  price: number;
  product_specification: {
    length: number;
    width: number;
    weight: number;
    height: number;
  };
  available: boolean;
  calc_average_ratings: number;
  evaluations: Evaluations[];
  categories: any[];
}
