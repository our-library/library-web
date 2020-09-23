import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import SignUpEmailInput from './emailInput';
import SignUpPasswordInput from './passwordInput';
import SignUpNameInput from './nameInput';
import SignUpCheckboxInput from './checkboxInput';
import {registerUserRequest} from "../../../store/api/registerApi";

function SignUp() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailAuthId, setEmailAuthId] = useState('');

  const [isTermsValid, setIsTermsValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [signUpDisableBtn, setSignUpDisableBtn] = useState(true);

  useEffect(() => {
    (isNameValid && isPasswordValid && isTermsValid && emailAuthId) && setSignUpDisableBtn(false);
  }, [isTermsValid, isNameValid, isPasswordValid, emailAuthId]);


  function submitUser() {
    const data = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      emailAuthenticationId: emailAuthId
    };
    registerUserRequest(data).then(() => {
      console.log('register success!');
    })
      .catch(e => console.log(e));
  }

  return (
    <div>
      <form action="" className="registerForm">
        <SignUpNameInput
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
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
          setPasswordValue={setPasswordValue}
        />
        <SignUpCheckboxInput
          isTermsValid={isTermsValid}
          setIsTermsValid={setIsTermsValid}
        />
        <button
          disabled={signUpDisableBtn}
          className="Btn-default Btn-sm"
          onClick={submitUser}
        >회원가입
        </button>
        <Link to='/forgetPassword'>
          <button className="TextBtn TextBtn--gray">초대 코드를 가지고 계신가요?</button>
        </Link>
      </form>
    </div>
  )
}

export default SignUp;
