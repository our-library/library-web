import React, {useEffect, useState} from 'react';

function TextInput(props) {
  const {type = 'text', size = 'md', value, onChange} = props;

  function handleText(e) {
    if(onChange) {
      onChange(e);
    }
  }

  return (
    <input
      {...props}
      type={type}
      className={`customInput ${size}`}
      onChange={handleText}
      value={value}
    />
  )
}

export default TextInput
