import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Api} from "../../../store/api";
import {getToken, setToken} from "../../../utils/handleToken";
import {useHistory, useLocation} from "react-router";
import {loginRequest} from "../../../store/api/registerApi";
import {fetchGroupMe} from "../../../store/api/groupApi";

function EmailErrorMessage() {
  return (
    <div className="InputErrorMsg">
      올바른 이메일 형식을 입력해 주세요.
    </div>
  )
}

function PasswordErrorMessage() {
  return (
    <div className="InputErrorMsg">
      형식에 맞는 비밀번호를 입력해 주세요.
    </div>
  )
}

function SignIn() {
  const history = useHistory();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isGroupUser, setIsGroupUser] = useState(null);

  function validateEmail(e) {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const isValid = re.test(e.target.value);
    setEmailValue(e.target.value);
    return setIsEmailValid(isValid);
  }

  function validatePassword(e) {
    const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const isValid = re.test(e.target.value);
    setPasswordValue(e.target.value);
    return setIsPasswordValid(isValid);
  }

  async function requestLogin() {
    try {
      const { token } = await loginRequest(emailValue, passwordValue);
      setToken(token);

      const groupData = await fetchGroupMe();
      console.log(groupData);
      const {count: userGroupCount} = groupData;

      if (userGroupCount === 0) {
        history.replace('/registerEntry');
      } else {
        history.replace('/service');
      }
    } catch (e) {
      console.log(e);
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
        onFocus={() => setIsEmailValid(false)}
      />
      {!isEmailValid && <EmailErrorMessage/>}
      <input
        className="InputText Input-md"
        type="password"
        placeholder="영문/숫자 혼용 8자 이상"
        onChange={validatePassword}
        onFocus={() => setIsPasswordValid(false)}
      />
      {!isPasswordValid && <PasswordErrorMessage/>}
      <button
        type="button"
        disabled={!isEmailValid && !isPasswordValid}
        className="Btn-default Btn-sm"
        onClick={requestLogin}
      >로그인
      </button>
      <Link to='/forgetPassword'>
        <button className="TextBtn TextBtn--gray">비밀번호를 잊으셨습니까?</button>
      </Link>
    </form>
  </div>
)

}

export default SignIn;
