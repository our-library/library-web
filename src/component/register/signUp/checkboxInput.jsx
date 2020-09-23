import React, {useState, useEffect} from 'react';

function SignUpCheckboxInput({isTermsValid, setIsTermsValid}) {


  function validateTerms() {
    setIsTermsValid(!isTermsValid);
  }

  return (
    <label className="checkboxGroup">
      <input
        type="checkbox"
        className="checkbox"
        checked={isTermsValid}
        onChange={validateTerms}
      />
      <span
      className="checkMark"
      />
      <span>(필수) 아워 라이브러리의&nbsp;
        <a href="https://www.notion.so/v-1-0-0-a795b84197734c63a7d9a58fadeba0ba" target="_blank" className="TextBtn">
          이용약관
        </a>,
        <a href="https://www.notion.so/v-1-0-0-5f7d9b04451747f9938113be7a42e4ad" target="_blank" className="TextBtn">
          개인정보 처리방침
        </a>
        에 동의합니다.</span>
    </label>
  )
}

export default SignUpCheckboxInput
