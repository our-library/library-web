import React from 'react';

function Button(props) {
  const { classType, size, handleClick, children, disabled } = props;
  return (
    <button
      type="button"
      className={`Btn-${classType} Btn-${size}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
