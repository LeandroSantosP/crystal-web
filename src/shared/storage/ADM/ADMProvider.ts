import { create, SetState } from 'zustand';
import { api } from '@/lib/api';

interface set_category_product_props {
  jwt: string;
  category_name: string;
  product_id: string;
}

interface ADMProviderParams {
  states: {
    client_list: [];
    error: any | null;
    loading: boolean;
    current_page: string | null;
    product_list: any[];
  };
  action: {
    getAllClients(twt: string): Promise<void>;
    setCurrentPage(page: string): void;
    getAllProducts(): Promise<void>;
    set_category_product(params: set_category_product_props): Promise<void>;
  };
}

const updatedState =
  (set: SetState<ADMProviderParams>) =>
  (newState: Partial<ADMProviderParams['states']>) => {
    set((storage) => ({
      ...storage,
      states: {
        ...storage.states,
        ...newState,
      },
    }));
  };

export const ADMProvider = create<ADMProviderParams>((set, get) => ({
  states: {
    client_list: [],
    product_list: [],
    error: null,
    loading: false,
    current_page: null,
    show_edit_product_painel: false,
  },
  action: {
    set_category_product: async ({ category_name, jwt, product_id }) => {
      updatedState(set)({
        loading: true,
      });
      try {
        await api.patch<[]>(
          '/product',
          { category_name, product_id },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        return;
      } catch (error: any) {
        console.log(error);

        updatedState(set)({
          error,
        });
      } finally {
        setTimeout(() => {
          updatedState(set)({
            loading: false,
          });
        }, 500);
      }
      return;
    },
    getAllClients: async (jwt: string) => {
      updatedState(set)({
        loading: true,
      });

      try {
        const { data } = await api.get<[]>('/admin/list', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        updatedState(set)({
          client_list: data,
        });
        return;
      } catch (error: any) {
        updatedState(set)({
          error,
          client_list: [],
        });
      } finally {
        updatedState(set)({
          loading: false,
        });
      }
    },
    getAllProducts: async () => {
      updatedState(set)({
        loading: true,
      });

      try {
        const { data } = await api.get<[]>('/product');

        updatedState(set)({
          product_list: data,
        });
        return;
      } catch (error: any) {
        updatedState(set)({
          error,
          product_list: [],
        });
      } finally {
        updatedState(set)({
          loading: false,
        });
      }
    },
    setCurrentPage(current_page) {
      updatedState(set)({
        current_page,
      });
    },
  },
}));
