import * as Dialog from '@radix-ui/react-dialog';
import { LoadingForm } from '@/components/LoadingForm';
import Image from 'next/image';
import { CategoryADMCard } from '@/components/CategoryADMCard';
import { CheckBox } from '@/components/CheckBox';
import { ButtonAdm } from '@/components/Buttons/ButtonAdm';
import { RadixCloseButton } from '@/components/RadixCloseButton';
import { ReactNode } from 'react';

export const OrderModal = ({ children }: { children: ReactNode }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-gray-800/90" />
        <Dialog.Content>
          <form
            className={`fixed left-[50%] top-[50%] flex h-full max-h-[600px] w-full max-w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-[6px] bg-gray-600 p-[25px] focus:outline-none`}
          >
            <Dialog.Title className="m-0 text-[37px] font-medium text-emerald-400">
              CheckOut
            </Dialog.Title>
            <div className="grid  grid-cols-2 gap-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-semibold tracking-wider text-white">
                    Payment
                  </h1>
                  <span className="text-sm">
                    todos seus dispositivos com nossos para celular.
                  </span>
                </div>
                <div className="flex h-20 w-full items-center gap-5 rounded-xl bg-blackA10 p-3">
                  <CheckBox
                    id={'ideia'}
                    name={'ideia'}
                    defaultChecked={false}
                    text={'Credits'}
                    value={'ideia'}
                  />
                  <div className="flex flex-col">
                    <span>Use Metafy Credits!</span>
                    <span className="text-xs">
                      todos seus dispositivos com nossos
                    </span>
                  </div>
                </div>
                <div className="flex h-52 w-full flex-col gap-5 rounded-xl bg-blackA10 p-3">
                  <div className="flex w-full items-center gap-3">
                    <input
                      className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-emerald-500"
                      type="checkbox"
                    />
                    <p>Credit or debit Card!</p>
                  </div>

                  <div className="flex h-full w-full flex-col items-end gap-5">
                    <input
                      className="selection:color-white flex h-[35px] w-[300px] appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
                      type="text"
                      id="width"
                      placeholder="8880 9992 9897 8978"
                      value="8880 9992 9897 8978"
                    />

                    <div className="flex w-[300px] gap-5">
                      <input
                        className="selection:color-white h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
                        type="text"
                        id="width"
                        placeholder="20/09"
                        value={'20/09'}
                      />
                      <input
                        className="selection:color-white h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
                        type="text"
                        id="width"
                        placeholder="889"
                        value="889"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-5 outline outline-2 outline-blackA10">
                1
              </div>
            </div>
            <div className="flex h-full ">
              <div className="se flex h-20 w-full items-center self-end rounded-xl bg-blackA10">
                test
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
