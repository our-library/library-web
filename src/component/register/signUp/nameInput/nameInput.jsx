import React, { useState } from 'react';
import PropTypes from 'prop-types';

function NameErrorMessage() {
  return <div className="InputErrorMsg">이름은 입력해 주세요. (1자 ~ 100자)</div>;
}

function SignUpNameInput({ setNameValue }) {
  const [isNameValid, setIsNameValid] = useState(true);

  function validateName(e) {
    if (e.target.value) {
      setIsNameValid(true);
      setNameValue(e.target.value);
    }
  }

  return (
    <>
      <input
        className="InputText Input-md"
        type="text"
        placeholder="이름"
        maxLength={100}
        onChange={validateName}
        onFocus={() => setIsNameValid(false)}
      />
      {!isNameValid && <NameErrorMessage />}
    </>
  );
}

SignUpNameInput.propTypes = {
  setNameValue: PropTypes.func.isRequired,
};

export default SignUpNameInput;
