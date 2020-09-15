import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ForgetPassword from '../forgetPassword/forgetPassword';


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
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    function validateEmail(e) {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isValid = re.test(e.target.value);
        return setIsEmailValid(isValid);
    }

    function validatePassword(e) {
        const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        const isValid = re.test(e.target.value);
        return setIsPasswordValid(isValid);
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
                <button disabled={!isEmailValid && !isPasswordValid} className="Btn-default Btn-sm">로그인 </button>
                <Link to='/forgetPassword'><button className="TextBtn TextBtn--gray">비밀번호를 잊으셨습니까?</button></Link>
            </form>
        </div>
    )

}

export default SignIn;
