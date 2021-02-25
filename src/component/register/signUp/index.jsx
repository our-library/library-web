import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import SignUpEmailInput from './emailInput';
import SignUpPasswordInput from './passwordInput';
import SignUpNameInput from './nameInput';
import SignUpCheckboxInput from './checkboxInput';
import { fetchLoginUser, registerUserRequest } from '../../../store/api/registerApi';
import { ROUTE_PATH } from '../../../constants/path';
import { KEY_CODE } from '../../../constants/keyCode';
import Button from '../../common/button';

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
        <Button type="default" size="sm" disabled={isSignUpBtnDisable} handleClick={submitUser}>
          회원가입
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
