import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import SignUpEmailInput from './emailInput';
import SignUpPasswordInput from './passwordInput';
import SignUpNameInput from './nameInput';
import SignUpCheckboxInput from './checkboxInput';
import { fetchLoginUser, registerUserRequest } from '../../../store/api/registerApi';
import { ROUTE_PATH } from '../../../constants/path';
import { KEY_CODE } from '../../../constants/keyCode';

function SignUp() {
  const history = useHistory();
  const { REGISTER_ENTRY, SERVICE } = ROUTE_PATH;
  const { ENTER } = KEY_CODE;
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailAuthId, setEmailAuthId] = useState('');

  const [isTermsValid, setIsTermsValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isSignUpBtnDisable, setIsSignUpBtnDisable] = useState(true);

  useEffect(() => {
    setIsSignUpBtnDisable(!(isNameValid && isPasswordValid && isTermsValid && emailAuthId));
  }, [isTermsValid, isNameValid, isPasswordValid, emailAuthId]);

  async function submitUser() {
    const submitUserData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      emailAuthenticationId: emailAuthId,
    };
    await registerUserRequest(submitUserData);

    const userGroupCount = await fetchLoginUser(emailValue, passwordValue);

    if (userGroupCount === 0) {
      history.replace(REGISTER_ENTRY);
    } else {
      history.replace(SERVICE);
    }
  }

  function handleEnterKeyPress(e) {
    if (e.key === ENTER) {
      submitUser();
    }
  }

  return (
    <div>
      <form action="" className="registerForm">
        <SignUpNameInput
          nameValue={nameValue}
          isNameValid={isNameValid}
          setIsNameValid={setIsNameValid}
          setNameValue={setNameValue}
        />
        <SignUpEmailInput
          emailAuthId={emailAuthId}
          setEmailAuthId={setEmailAuthId}
          setEmailValue={setEmailValue}
          emailValue={emailValue}
        />
        <SignUpPasswordInput
          passwordValue={passwordValue}
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
          setPasswordValue={setPasswordValue}
          onKeyPress={handleEnterKeyPress}
        />
        <SignUpCheckboxInput isTermsValid={isTermsValid} setIsTermsValid={setIsTermsValid} />
        <button
          type="button"
          disabled={isSignUpBtnDisable}
          className="Btn-default Btn-sm"
          onClick={submitUser}
        >
          회원가입
        </button>
        <Link to="/forgetPassword">
          <button type="button" className="TextBtn TextBtn--gray">
            초대 코드를 가지고 계신가요?
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
