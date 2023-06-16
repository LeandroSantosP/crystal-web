import { create, SetState } from 'zustand';
import { api } from '@/lib/api';

interface category_list_props {
  description: string;
  id: string;
  name: string;
  subCategories: [];
}

interface CategoryProviderParams {
  states: {
    category_list: category_list_props[];
    error: any | null;
    loading: boolean;
  };
  action: {
    getAllCatagories(): Promise<void>;
  };
}

const updatedState =
  (set: SetState<CategoryProviderParams>) =>
  (newState: Partial<CategoryProviderParams['states']>) => {
    set((storage) => ({
      ...storage,
      states: {
        ...storage.states,
        ...newState,
      },
    }));
  };

export const CategoryProvider = create<CategoryProviderParams>((set, get) => ({
  states: {
    category_list: [],
    error: null,
    loading: false,
  },
  action: {
    getAllCatagories: async () => {
      updatedState(set)({
        loading: true,
      });

      try {
        const { data } = await api.get('/category');

        updatedState(set)({
          category_list: data,
        });
      } catch (error) {
        updatedState(set)({
          error,
        });
      } finally {
        updatedState(set)({
          loading: false,
        });
      }
    },
  },
}));
