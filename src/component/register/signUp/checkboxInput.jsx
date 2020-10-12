import React from 'react';
import { TERMS_LINK } from '../../../constants/termsLink';
import Checkbox from '../../common/checkbox';

function SignUpCheckboxInput({ isTermsValid, setIsTermsValid }) {
  const { TERMS_OF_USE, INFO_PROCESSING_POLICY } = TERMS_LINK;

  function validateTerms() {
    setIsTermsValid(!isTermsValid);
  }

  return (
    <Checkbox isChecked={isTermsValid} handleCheckBox={validateTerms}>
      <span>
        (필수) 아워 라이브러리의&nbsp;
        <a href={TERMS_OF_USE} target="_blank" className="TextBtn" rel="noreferrer">
          이용약관
        </a>
        ,
        <a href={INFO_PROCESSING_POLICY} target="_blank" className="TextBtn" rel="noreferrer">
          개인정보 처리방침
        </a>
        에 동의합니다.
      </span>
    </Checkbox>
  );
}

export default SignUpCheckboxInput;
