import React from 'react';

function Card({ title, children }) {
  return (
    <div className="max-w mx-auto bg-white shadow-md rounded-lg mt-4 border border-slate-200 border-t-orange-600 border-t-8">
      {title && (
        <div className="bg-gray-100 px-4 py-2 rounded-t-lg">
          <h2 className="text-xl font-bold flex flex-row items-center gap-2">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export default Card;
