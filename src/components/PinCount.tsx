interface PicCount {
  count: number;
}

export const PinCount = (params: PicCount) => {
  return (
    <div className="absolute right-[-5px] top-[-10px] flex h-8 w-8 rotate-12 items-center justify-center rounded-full bg-gray-800 text-white outline outline-offset-0 outline-red-500">
      {params.count}
    </div>
  );
};
