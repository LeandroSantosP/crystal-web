import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface ToastProp {
  timer?: number;
  theme?: 'dark' | 'light' | 'colored';
  Icon: JSX.Element;
}

export const ToastHook = ({
  theme = 'dark',
  timer = 4000,
  Icon,
}: ToastProp) => {
  return {
    ToastContainer: (
      <ToastContainer
        position="top-right"
        autoClose={timer}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
        icon={Icon}
      />
    ),
    toast,
  };
};
