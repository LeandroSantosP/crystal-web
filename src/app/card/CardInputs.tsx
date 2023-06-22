import { CardInput } from '@/app/card/CardInput';

export const CardInputs = () => {
  return (
    <div className="flex h-52 w-full flex-col gap-5 rounded-xl bg-blackA9 p-3">
      <div className="flex h-full w-full flex-col items-end gap-5">
        <div className="flex w-full items-center gap-3">
          <CardInput
            id={'test'}
            name={'test'}
            value={'test'}
            type={'checkbox'}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-emerald-500"
          />
          <label htmlFor={'test'}>Credit or debit Card!</label>
        </div>
        <CardInput
          type="text"
          id="width"
          readOnly
          placeholder="8880 9992 9897 8978"
          value="8880 9992 9897 8978"
          className="selection:color-white flex h-[35px] w-[300px]  appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
        />

        <div className="flex w-[300px] gap-5">
          <CardInput
            type="text"
            readOnly
            id="width"
            placeholder="20/09"
            value="20/09"
            className="selection:color-white h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
          />

          <CardInput
            type="text"
            readOnly
            id="width"
            placeholder="889"
            value="889"
            className="selection:color-white h-[35px] w-full appearance-none items-center justify-center rounded-[4px] border-none bg-blackA5 p-6 px-[10px] text-[15px] text-emerald-400 shadow-[0_0_0_1px] shadow-blackA9 outline-none selection:bg-blackA9 focus:border-sky-500 focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};
