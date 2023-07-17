import React from 'react';

export default function Button({ children, color }) {
  return (
    <button type="submit" className={`btn btn-${color}`}>
      {children}
    </button>
  );
}
