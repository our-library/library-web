import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import SignUpEmailInput from './emailInput';
import SignUpPasswordInput from './passwordInput';
import SignUpNameInput from './nameInput';
import SignUpCheckboxInput from './checkboxInput';
import {getToken} from '../../../utils/handleToken';
import {Api} from "../../../store/api";

function Index() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailAuthId, setEmailAuthId] = useState('');

  function submitUser() {
    Api.fetch({
      url: 'users',
      method: 'post',
      data: {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        emailAuthenticationId: emailAuthId
      }
    }).then(() => console.log('Sign up success'))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    console.log(getToken());
  });

  return (
    <div>
      <form action="" className="registerForm">
        <SignUpNameInput setNameValue={setNameValue}/>
        <SignUpEmailInput
          emailAuthId = {emailAuthId}
          setEmailAuthId={setEmailAuthId}
          setEmailValue={setEmailValue}
          emailValue={emailValue}
        />
        <SignUpPasswordInput setPasswordValue={setPasswordValue}/>
        <SignUpCheckboxInput/>
        <button
          disabled={false}
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

export default Index;
