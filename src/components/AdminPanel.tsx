'use client';

import { ADMProvider } from '@/shared/storage';
import { ProductsList } from './ProductList';
import { ToastProvider } from "@/shared/storage/Toast/ToastProvider";
import React, { useEffect } from "react";


export const AdminPanel = () => {
  const {
    states: { current_page },
  } = ADMProvider();
  const { action: { handle_set_toast_container  }, states: { ToastContainer} } = ToastProvider();

  useEffect(()=>{
    handle_set_toast_container();
  },[handle_set_toast_container]);



  const page_component: { [key: string]: JSX.Element } = {
    products: <ProductsList />,
  };

  return (
    <div className="flex max-h-[410px] max-w-[800px] grow-[5] justify-center rounded-md bg-gray-700  p-1">
      {ToastContainer}
      {current_page && page_component[current_page]}
    </div>
  );
};
