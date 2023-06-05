interface CheckBoxProps {
  text: string;
  name: string;
  id: string;
  value: string;
  defaultChecked?: boolean;
}

export const CheckBox = ({
  text,
  name,
  id,
  value,
  defaultChecked = false,
}: CheckBoxProps) => (
  <div className="text-md flex h-min flex-grow-0 items-center justify-center gap-2 rounded-md border-b-4 border-emerald-500 bg-gray-600 p-2 font-semibold text-gray-100">
    <input
      defaultChecked={defaultChecked}
      className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-emerald-500"
      type="checkbox"
      name={name}
      id={id}
      value={value}
    />
    <input
      className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-emerald-500"
      type="hidden"
      name={name}
      value="unmarked"
    />

    <label htmlFor={id}>{text}</label>
  </div>
);
