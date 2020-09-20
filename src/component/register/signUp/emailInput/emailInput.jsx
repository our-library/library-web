import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Api } from '../../../../store/api';

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
  const [isEmailExistence] = useState(false);
  const [disableEmailAuthBtn, setDisableEmailAuthBtn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function validateEmail(e) {
    const re = /^(([^<>()\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const { value } = e.target;
    const isValid = re.test(value);
    setEmailValue(value);
    setDisableEmailAuthBtn(!isValid);
    return setIsEmailValid(isValid);
  }

  function validEmailAuthorization(e) {
    setEmailAuthKey(e.target.value);
  }

  function handleEmailAuth() {
    setIsEmailAuth(true);
    Api.fetch({
      url: 'email-authentications',
      method: 'post',
      data: {
        email: emailValue,
      },
    })
      .then((res) => {
        setEmailAuthId(res.emailAuthenticationId);
        console.log(res.emailAuthenticationId);
      })
      .catch((error) => console.log(error));
  }

  function completeEmailAuth() {
    Api.fetch({
      url: `/email-authentications/${emailAuthId}/authenticate`,
      method: 'post',
      data: {
        authenticationKey: emailAuthKey,
      },
    })
      .then(() => {
        setIsAuthenticated(true);
        console.log('email authorization success');
      })
      .catch((error) => console.log(error));
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
          onFocus={() => setIsEmailValid(false)}
        />
        <button
          type="button"
          disabled={disableEmailAuthBtn || isAuthenticated}
          className="Btn-primary Btn-sm"
          onClick={handleEmailAuth}
        >
          인증하기
        </button>
      </div>
      {!isEmailExistence && <EmailExistenceErrorMessage />}
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
            <button type="button" disabled={!emailAuthKey} className="Btn-default Btn-sm" onClick={completeEmailAuth}>
              인증완료
            </button>
          )}
        </div>
      )}
    </>
  );
}

SignUpEmailInput.propTypes = {
  emailAuthId: PropTypes.string,
  emailValue: PropTypes.string,
  setEmailAuthId: PropTypes.func,
  setEmailValue: PropTypes.func,
};

SignUpEmailInput.defaultProps = {
  emailAuthId: '',
  emailValue: '',
  setEmailAuthId() {},
  setEmailValue() {},
};

export default SignUpEmailInput;
