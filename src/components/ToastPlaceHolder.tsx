'use client';
import { ToastProvider } from '@/shared/storage';
import { useEffect } from 'react';

export const ToastPlaceHolder = () => {
  const {
    states: { ToastContainer, toast_settings },
    action: { handle_set_toast_container },
  } = ToastProvider();

  useEffect(() => {
    handle_set_toast_container();
  }, [handle_set_toast_container, toast_settings]);

  return <>{ToastContainer}</>;
};
