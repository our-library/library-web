import React from 'react';
import { validatePasswordValue } from '../../../utils/handleValidation';

function PasswordErrorMessage() {
  return <div className="InputErrorMsg">형식에 맞는 비밀번호를 입력해 주세요.</div>;
}

function SignUpPasswordInput({
  passwordValue,
  isPasswordValid,
  setPasswordValue,
  setIsPasswordValid,
}) {
  function validatePassword(e) {
    const { value } = e.target;
    const isValid = validatePasswordValue(value);
    setPasswordValue(value);
    setIsPasswordValid(isValid);
  }

  return (
    <>
      <input
        className="InputText Input-md"
        type="password"
        placeholder="비밀번호(영문/숫자/특수문자 혼합 8자 이상)"
        maxLength={30}
        onChange={validatePassword}
        value={passwordValue}
      />
      {isPasswordValid ? true : <PasswordErrorMessage />}
    </>
  );
}

export default SignUpPasswordInput;
