import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router';
import SignUpEmailInput from './emailInput';
import SignUpPasswordInput from './passwordInput';
import SignUpNameInput from './nameInput';
import SignUpCheckboxInput from './checkboxInput';
import { fetchLoginUser, registerUserRequest } from '../../../store/api/registerApi';

function SignUp() {
  const history = useHistory();
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
    try {
      const submitUserData = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        emailAuthenticationId: emailAuthId,
      };
      await registerUserRequest(submitUserData);

      const userGroupCount = await fetchLoginUser(emailValue, passwordValue);

      if (userGroupCount === 0) {
        history.replace('/registerEntry');
      } else {
        history.replace('/service');
      }
    } catch (e) {
      window.alert(e.message);
    }
  }

  function handleEnterKeyPress(e) {
    if (e.key === 'Enter') {
      submitUser().then();
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
      </form>
    </div>
  );
}

export default SignUp;
