import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

export default function NoDataFound({ data }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <FaRegCircleXmark className="text-6xl text-gray-400" />
      <p className="text-gray-400">
        No data
        {data}
        {' '}
        found
      </p>
    </div>
  );
}
