import React, {useState, useEffect} from 'react';

function NameErrorMessage() {
  return (
    <div className="InputErrorMsg">
      이름은 입력해 주세요. (1자 ~ 100자)
    </div>
  )
}

function SignUpNameInput({nameValue, isNameValid, setIsNameValid, setNameValue}) {

  function validateName(e) {
    const {value: nameValue} = e.target;
    setNameValue(nameValue);
    setIsNameValid(nameValue.length > 1);
  }

  return (
    <>
      <input
        className="InputText Input-md"
        type="text"
        placeholder="이름"
        maxLength={100}
        onChange={validateName}
        value={nameValue}
      />
      {!isNameValid && <NameErrorMessage/>}
    </>
  )
}

export default SignUpNameInput
