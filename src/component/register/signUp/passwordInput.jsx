import React from 'react';

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
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const isValid = re.test(e.target.value);
    setPasswordValue(e.target.value);
    return setIsPasswordValid(isValid);
  }

  return (
    <>
      <input
        className="InputText Input-md"
        type="password"
        placeholder="비밀번호 영문/숫자 혼용 8자 이상"
        onChange={validatePassword}
        value={passwordValue}
      />
      {isPasswordValid ? true : <PasswordErrorMessage />}
    </>
  );
}

export default SignUpPasswordInput;
