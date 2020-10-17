import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { fetchLoginUser } from '../../../store/api/registerApi';
import ErrorModal from '../../modal/errorModal';
import { ERROR_MODAL_DATA } from '../../../constants/modal';
import { ROUTE_PATH } from '../../../constants/path';
import { KEY_CODE } from '../../../constants/keyCode';
import { validateEmailInput, validatePasswordValue } from '../../../utils/handleValidation';
import Button from '../../common/button';
import Icon from "../../common/icon";
import Spinner from "../../common/spinner";

function EmailErrorMessage() {
  return <div className="InputErrorMsg">올바른 이메일 형식을 입력해 주세요.</div>;
}

function PasswordErrorMessage() {
  return <div className="InputErrorMsg">형식에 맞는 비밀번호를 입력해 주세요.</div>;
}

function SignIn() {
  const history = useHistory();
  const { LOGIN_ERROR } = ERROR_MODAL_DATA;
  const { REGISTER_ENTRY, SERVICE } = ROUTE_PATH;
  const { ENTER } = KEY_CODE;
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isLoginBtnDisable, setIsLoginBtnDisable] = useState(true);
  const [openLoginErrorModal, setOpenLoginErrorModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoginBtnDisable(!(isEmailValid && isPasswordValid && emailValue && passwordValue));
  }, [emailValue, passwordValue]);

  function validateEmail(e) {
    const { value } = e.target;
    const isValid = validateEmailInput(value);
    setEmailValue(value);
    setIsEmailValid(isValid);
  }

  function validatePassword(e) {
    const { value } = e.target;
    const isValid = validatePasswordValue(value);
    setPasswordValue(value);
    setIsPasswordValid(isValid);
  }

  async function requestLogin() {
    try {
      setIsLoading(true);
      const userGroupCount = await fetchLoginUser(emailValue, passwordValue);
      setIsLoading(false);

      if (userGroupCount === 0) {
        history.replace(REGISTER_ENTRY);
      } else {
        history.replace(SERVICE);
      }
    } catch (e) {
      setOpenLoginErrorModal(true);
    }
  }

  function handleEnterKeyPress(e) {
    if (e.key === ENTER) {
      requestLogin();
    }
  }

  return (
    <div>
      <form action="" className="registerForm">
        <input
          className="InputText Input-md"
          type="text"
          placeholder="이메일@example.com"
          maxLength={100}
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
        <Button
          classType="default"
          size="sm"
          disabled={isLoginBtnDisable}
          handleClick={requestLogin}
        >
          {isLoading && <Spinner className="mr-2x" />}
          로그인
        </Button>

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
