import React from 'react';

function Checkbox({ isChecked, handleCheckBox, children }) {
  return (
    <label className="checkboxGroup">
      <input type="checkbox" className="checkbox" checked={isChecked} onChange={handleCheckBox} />
      <span className="checkMark" />
      {children}
    </label>
  );
}

export default Checkbox;
