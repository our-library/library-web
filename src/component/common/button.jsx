import React from 'react';

function Button(props) {
  const { classType, size = 'md', handleClick, children, disabled } = props;
  return (
    <button
      type="button"
      className={`Btn-${classType} Btn-${size}`}
      onMouseDown={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
