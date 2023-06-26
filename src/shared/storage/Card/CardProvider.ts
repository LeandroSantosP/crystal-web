import { create, SetState } from 'zustand';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import decode from 'jwt-decode';
import { User } from '@/lib/getCredentials';
import axios from 'axios';
import { api } from '@/lib/api';
export type products_items = Array<{ id: string; quantity: number }>;
export type card_type = {
  client_id?: string;
  order_date?: string;
  freight_type?: string;
  products: products_items;
};

export interface CompleterParams {
  freight_type: string;
}
interface OrderResponse {
  ticket: {
    order_code: string;
    total: number;
    expected_time: string;
    freight: number;
  };
}
interface SimulateConfirmOutPut {
  expected_time: string;
  total: number;
}
interface CardProviderParams {
  states: {
    card: card_type;
    loading?: boolean;
  };
  action: {
    add_item(input: { id: string; quantity: number }): void;
    remove_item(params: { product_id: string }): void;
    setComplement(params: CompleterParams): void;
    confirm(params: card_type): Promise<OrderResponse | undefined>;
    SimulateConfirm(
      freight_type: string,
      products: products_items
    ): Promise<SimulateConfirmOutPut | undefined>;
  };
}

const updatedState =
  (set: SetState<CardProviderParams>) =>
  (newState: Partial<CardProviderParams['states']>) => {
    set((storage) => ({
      ...storage,
      states: {
        ...storage.states,
        ...newState,
      },
    }));
  };

let items = localStorage.getItem('card_item') as any;

export const CardProvider = create<CardProviderParams>((set, get) => ({
  states: {
    loading: false,
    card: {
      products: JSON.parse(items),
    },
  },
  action: {
    async SimulateConfirm(freight_type: string, products: products_items) {
      const jwt = Cookies.get('token');
      if (!jwt) return;
      const { sub: client_id } = decode(jwt) as User;
      const current_date = new Date();
      const date = format(current_date, 'dd-MM-yyyy');

      try {
        const params = {
          client_id,
          freight_type,
          date,
          products: JSON.stringify(products),
        };

        const response = await axios<SimulateConfirmOutPut>({
          url: 'http://localhost:3333/order/calculate-freight',
          method: 'GET',
          responseType: 'json',
          params,
        });

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    setComplement({ freight_type }: CompleterParams) {
      const jwt = Cookies.get('token');

      if (!jwt) return;

      const { sub: client_id } = decode(jwt) as User;
      const data = new Date();
      const order_date = format(data, 'dd-MM-yyyy');

      set({
        states: {
          card: {
            client_id,
            freight_type,
            order_date,
            products: JSON.parse(items),
          },
        },
      });
    },
    add_item(params) {
      let items = localStorage.getItem('card_item') as any;
      const new_item = { id: params.id, quantity: params.quantity };

      if (items) {
        items = JSON.parse(items);

        const existing_item = items.find((item: any) => item.id === params.id);

        if (existing_item) {
          items.splice(items.indexOf(existing_item), 1);
        }

        items.unshift(new_item);
      } else {
        items = [new_item];
      }

      localStorage.setItem('card_item', JSON.stringify(items));

      set({
        states: {
          card: {
            products: items,
          },
        },
      });
    },
    remove_item({ product_id }: { product_id: string }) {
      let items = localStorage.getItem('card_item') as any;

      if (items) {
        items = JSON.parse(items);
        const index = items.findIndex((item: any) => item.id === product_id);
        if (index !== -1) {
          items.splice(index, 1);
        }
      }

      localStorage.setItem('card_item', JSON.stringify(items));

      updatedState(set)({
        card: {
          products: items,
        },
      });
    },
    async confirm(params: card_type) {
      updatedState(set)({
        loading: true,
      });
      const jwt = Cookies.get('token');

      try {
        const res = await axios<OrderResponse>({
          url: 'http://localhost:3333/order',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          data: { ...params },
        });

        return res.data;
      } catch (error) {
        console.log(error);
      } finally {
        updatedState(set)({
          loading: false,
        });
      }
    },
  },
}));
