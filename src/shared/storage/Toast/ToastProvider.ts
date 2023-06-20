import { create, SetState } from 'zustand';
import { ToastHook, ToastProp } from '@/components/Toast';
import React from 'react';
import { toast } from 'react-toastify';

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

interface CategoryProviderParams {
  states: {
    ToastContainer: React.ReactElement | null;
    toast: typeof toast | null;
    toast_settings: {
      timer?: number;
      theme?: 'dark' | 'light' | 'colored';
      Icon: any;
    };
  };
  action: {
    handle_settings_toast(params: ToastProp): void;
    handle_set_toast_container: () => void;
  };
}

export const ToastProvider = create<CategoryProviderParams>((set, get) => ({
  states: {
    toast_settings: {
      timer: 2000,
      Icon: null,
    },
    ToastContainer: null,
    toast: null,
  },
  action: {
    handle_settings_toast(params: ToastProp) {
      updatedState(set)({
        toast_settings: {
          ...params,
        },
      });
    },
    handle_set_toast_container() {
      const {
        states: { toast_settings },
      } = get();

      const { ToastContainer, toast } = ToastHook({
        ...toast_settings,
      });

      updatedState(set)({
        ToastContainer,
        toast,
      });
    },
  },
}));
