import { create, SetState } from 'zustand';

export type products_items = Array<{ id: string; quantity: number }>;
export type card_type = {
  client_id?: string;
  order_date?: string;
  freight_type?: string;
  products: products_items;
};
interface CardProviderParams {
  states: {
    card: card_type;
  };
  action: {
    add_item(input: { id: string; quantity: number }): void;
    remove_item(params: { product_id: string }): void;
    confirm(): void;
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

export const CardProvider = create<CardProviderParams>((set) => ({
  states: {
    card: {
      products: JSON.parse(items),
    },
  },
  action: {
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
    confirm() {},
  },
}));
