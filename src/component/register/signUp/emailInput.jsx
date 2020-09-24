import React, {useState, useEffect} from 'react';
import {Api} from "../../../store/api";
import {EmailAuthorizeRequest, fetchEmailAuthorize, fetchEmailExistence} from "../../../store/api/registerApi";

function EmailErrorMessage() {
  return (
    <div className="InputErrorMsg">
      정확한 이메일을 입력해 주세요.
    </div>
  )
}

function EmailExistenceErrorMessage() {
  return (
    <div className="InputErrorMsg">
      이미 존재하는 이메일입니다.
    </div>
  )
}

function SignUpEmailInput({setEmailAuthId, emailAuthId, emailValue, setEmailValue}) {
  const [emailAuthKey, setEmailAuthKey] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isEmailAuth, setIsEmailAuth] = useState(false);
  const [isEmailExistence, setIsEmailExistence] = useState(false);
  const [disableEmailAuthBtn, setDisableEmailAuthBtn] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  function validateEmail(e) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const emailValue = e.target.value;
    const isValid = re.test(emailValue);
    setEmailValue(emailValue);
    setDisableEmailAuthBtn(!isValid);
    return setIsEmailValid(isValid);
  }

  function validEmailAuthorization(e) {
    setEmailAuthKey(e.target.value);
  }

  async function handleEmailAuth() {
    try {
      const { existence: isEmailExistence } = await fetchEmailExistence(emailValue);
      if(!isEmailExistence) {
        setIsEmailExistence(false);
        setIsEmailAuth(true);
        const { emailAuthenticationId } = await EmailAuthorizeRequest(emailValue);
        console.log(emailAuthenticationId);
        setEmailAuthId(emailAuthenticationId);
      } else {
        setIsEmailExistence(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  function completeEmailAuth() {
    fetchEmailAuthorize(emailAuthId, emailAuthKey).then(() => {
      setIsAuthenticated(true);
      console.log('email authorization success')
    })
      .catch(e => console.log(e))
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
        />
        <button
          type="button"
          disabled={disableEmailAuthBtn || isAuthenticated}
          className="Btn-primary Btn-sm"
          onClick={handleEmailAuth}
        >인증하기
        </button>
      </div>
      {isEmailExistence && <EmailExistenceErrorMessage/>}
      {!isEmailValid && <EmailErrorMessage/>}
      {isEmailAuth &&
      <div>
        <input
          className="InputText Input-md"
          type="text"
          placeholder="인증코드 입력"
          disabled={isAuthenticated}
          onChange={validEmailAuthorization}
        />
        {!isAuthenticated &&
        <button
          type="button"
          disabled={!emailAuthKey}
          className="Btn-default Btn-sm"
          onClick={completeEmailAuth}
        >인증완료
        </button>
        }
      </div>}
    </>
  )

}

export default SignUpEmailInput
