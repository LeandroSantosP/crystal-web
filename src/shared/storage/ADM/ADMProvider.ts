import { create, SetState } from 'zustand';
import { api } from '@/lib/api';

interface ADMProviderParams {
  states: {
    client_list: [];
    error: any | null;
    loading: boolean;
  };
  action: {
    getAllClients(twt: string): Promise<void>;
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
    error: null,
    loading: false,
  },
  action: {
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
  },
}));
