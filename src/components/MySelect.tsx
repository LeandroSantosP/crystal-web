'use client';

import React, { useEffect, useState } from 'react';

interface MySelectProps {
  callback(value: string): any;
  default_value?: string;
  options: { value: string; text: string }[];
}

export const MySelect = ({
  callback,
  default_value = 'products',
  options,
}: MySelectProps) => {
  const [value, setValue] = useState(default_value);

  useEffect(() => {
    callback(value);
  }, [callback, value]);

  return (
    <div>
      <select
        defaultValue={default_value}
        onChange={(e) => setValue(e.target.value)}
        id="countries"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
};
