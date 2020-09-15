import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import SignUpEmailInput from './emailInput/emailInput';
import SignUpPasswordInput from './passwordInput/passwordInput';
import SignUpNameInput from './nameInput/nameInput';
import SignUpCheckboxInput from './checkboxInput/checkboxInput';
import {getToken} from '../../../utils/setToken/setToken';

function SignUp() {
  // const dispatch = useDispatch();
  // const emailAuthId = useSelector(selectEmailAuthId);
  // const loading = useSelector(selectLoading).toString();
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [emailAuthId, setEmailAuthId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function submitUser() {
    // dispatch(registerUser({
    //   name: nameValue,
    //   email: emailValue,
    //   password: passwordValue,
    //   emailAuthenticationId: emailAuthId
    // }))
  }

  useEffect(() => {
    console.log(getToken());
  });

  return (
    <div>
      <form action="" className="registerForm">
        <SignUpNameInput setNameValue={setNameValue}/>
        <SignUpEmailInput
          emailAuthId={emailAuthId}
          isAuthenticated={isAuthenticated}
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

export default SignUp;
