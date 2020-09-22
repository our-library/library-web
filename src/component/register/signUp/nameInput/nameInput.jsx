import React, {useState, useEffect} from 'react';

function NameErrorMessage() {
  return (
    <div className="InputErrorMsg">
      이름은 입력해 주세요. (1자 ~ 100자)
    </div>
  )
}

function SignUpNameInput({ setNameValue }) {
  const [isNameValid, setIsNameValid] = useState(true);

  function validateName(e) {
    if (e.target.value) {
      const nameValue = e.target.value;
      (nameValue.length > 1) ? setIsNameValid(true) : setIsNameValid(false);
      setNameValue(nameValue);
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
      {!isNameValid && <NameErrorMessage/>}
    </>
  )
}

export default SignUpNameInput
