import React, { useState } from 'react';
import {
  EmailAuthorizeRequest,
  fetchEmailAuthorize,
  fetchEmailExistence,
} from '../../../store/api/registerApi';
import { validateEmailInput } from '../../../utils/handleValidation';

function EmailErrorMessage() {
  return <div className="InputErrorMsg">정확한 이메일을 입력해 주세요.</div>;
}

function EmailExistenceErrorMessage() {
  return <div className="InputErrorMsg">이미 존재하는 이메일입니다.</div>;
}

function SignUpEmailInput({ setEmailAuthId, emailAuthId, emailValue, setEmailValue }) {
  const [emailAuthKey, setEmailAuthKey] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isEmailExistence, setIsEmailExistence] = useState(false);
  const [disableEmailAuthBtn, setDisableEmailAuthBtn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function validateEmail(e) {
    const { value } = e.target;
    const isValid = validateEmailInput(value);
    setEmailValue(value);
    setDisableEmailAuthBtn(!isValid);
    return setIsEmailValid(isValid);
  }

  function validEmailAuthorization(e) {
    setEmailAuthKey(e.target.value);
  }

  async function handleEmailAuth() {
    const { existence } = await fetchEmailExistence(emailValue);
    if (!existence) {
      setIsEmailExistence(false);
      setIsEmailAuth(true);
      const { emailAuthenticationId } = await EmailAuthorizeRequest(emailValue);
      setEmailAuthId(emailAuthenticationId);
    } else {
      setIsEmailExistence(true);
    }
  }

  async function completeEmailAuth() {
    await fetchEmailAuthorize(emailAuthId, emailAuthKey);
    setIsAuthenticated(true);
  }

  function handleEmailAuthEnterKeyPress(e) {
    if (e.key === 'Enter') {
      handleEmailAuth().then();
    }
  }

  function resetEmailAuth() {
    setEmailAuthKey('');
    setIsEmailValid(true);
    setIsEmailAuth(false);
    setIsEmailExistence(false);
    setIsAuthenticated(false);
  }

  return (
    <>
      <div className="inputWithBtnWrap">
        <input
          className="InputText Input-md"
          disabled={isAuthenticated}
          type="text"
          placeholder="이메일@example.com"
          onChange={validateEmail}
          onKeyPress={handleEmailAuthEnterKeyPress}
        />
        {!isEmailAuth && (
          <button
            type="button"
            disabled={disableEmailAuthBtn || isAuthenticated}
            className="Btn-primary Btn-sm"
            onClick={handleEmailAuth}
          >
            인증하기
          </button>
        )}
      </div>
      {isEmailExistence && <EmailExistenceErrorMessage />}
      {!isEmailValid && <EmailErrorMessage />}
      {isEmailAuth && (
        <div>
          <input
            className="InputText Input-md"
            type="text"
            placeholder="인증코드 입력"
            disabled={isAuthenticated}
            onChange={validEmailAuthorization}
          />
          {!isAuthenticated && (
            <button
              type="button"
              disabled={!emailAuthKey}
              className="Btn-default Btn-sm"
              onClick={completeEmailAuth}
            >
              인증완료
            </button>
          )}
        </div>
      )}
      {isAuthenticated && (
        <div>
          인증 완료!
          <button type="button" className="Btn-default Btn-sm" onClick={resetEmailAuth}>
            재인증하기
          </button>
        </div>
      )}
    </>
  );
}

export default SignUpEmailInput;
