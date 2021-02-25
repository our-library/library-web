import React, {useEffect, useState} from 'react';

function TextButton(props) {
  const { children, type, onMouseDown } = props;


  return (
    <button
      {...props}
      className={`textBtn-${type}`}
      onMouseDown={onMouseDown}
      type="button"
    >
      {children}
    </button>
  )
}

export default TextButton
