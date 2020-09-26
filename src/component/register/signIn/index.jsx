import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { fetchLoginUser } from '../../../store/api/registerApi';
import ErrorModal from '../../modal/ErrorModal';
import { ERROR_MODAL_DATA } from '../../../constants/modalData';

function EmailErrorMessage() {
  return <div className="InputErrorMsg">올바른 이메일 형식을 입력해 주세요.</div>;
}

function PasswordErrorMessage() {
  return <div className="InputErrorMsg">형식에 맞는 비밀번호를 입력해 주세요.</div>;
}

function SignIn() {
  const { LOGIN_ERROR } = ERROR_MODAL_DATA;
  const history = useHistory();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoginBtnDisable, setIsLoginBtnDisable] = useState(true);
  const [openLoginErrorModal, setOpenLoginErrorModal] = useState(false);

  useEffect(() => {
    setIsLoginBtnDisable(!(isEmailValid && isPasswordValid && emailValue && passwordValue));
  }, [emailValue, passwordValue]);

  function validateEmail(e) {
    const { value } = e.target;
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const isValid = re.test(value);
    setEmailValue(value);
    setIsEmailValid(isValid);
  }

  function validatePassword(e) {
    const { value } = e.target;
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const isValid = re.test(value);
    setPasswordValue(value);
    setIsPasswordValid(isValid);
  }

  async function requestLogin() {
    try {
      const userGroupCount = await fetchLoginUser(emailValue, passwordValue);

      if (userGroupCount === 0) {
        history.replace('/registerEntry');
      } else {
        history.replace('/service');
      }
    } catch (e) {
      setOpenLoginErrorModal(true);
    }
  }

  function handleEnterKeyPress(e) {
    if (e.key === 'Enter') {
      requestLogin().then();
    }
  }

  return (
    <div>
      <form action="" className="registerForm">
        <input
          className="InputText Input-md"
          type="text"
          placeholder="이메일@example.com"
          onChange={validateEmail}
          value={emailValue}
        />
        {!isEmailValid && <EmailErrorMessage />}
        <input
          className="InputText Input-md"
          type="password"
          placeholder="비밀번호(영문/숫자/특수문자 혼합 8자 이상)"
          maxLength={30}
          onChange={validatePassword}
          value={passwordValue}
          onKeyPress={handleEnterKeyPress}
        />
        {!isPasswordValid && <PasswordErrorMessage />}
        <button
          type="button"
          disabled={isLoginBtnDisable}
          className="Btn-default Btn-sm"
          onClick={requestLogin}
        >
          로그인
        </button>
        <Link to="/forgetPassword">
          <button type="button" className="TextBtn TextBtn--gray">
            비밀번호를 잊으셨습니까?
          </button>
        </Link>
      </form>
      {openLoginErrorModal && (
        <ErrorModal errorType={LOGIN_ERROR} setIsOpenModal={setOpenLoginErrorModal} />
      )}
    </div>
  );
}

export default SignIn;
