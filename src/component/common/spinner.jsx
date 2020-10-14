import React from 'react';

function Spinner({ className }) {
  return (
    <svg className={`spinner ${className}`} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" fill="none" cx="33" cy="33" r="30" />
    </svg>
  );
}

export default Spinner;
