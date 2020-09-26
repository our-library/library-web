import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import InviteCodeInput from './inviteCodeInput';
import JobNameInput from './jobNameInput';
import { joinGroupRequest } from '../../store/api/groupApi';

function RegisterEntry() {
  const history = useHistory();
  const [jobKey, setJobKey] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isValidJopNameValue, setIsValidJopNameValue] = useState(false);
  const [isInvitationBtnDisable, setIsInvitationBtnDisable] = useState(true);

  async function handleJoinGroup() {
    joinGroupRequest(inviteCode, jobKey).then(() => {
      history.push('/service');
    });
  }

  useEffect(() => {
    setIsInvitationBtnDisable(!(inviteCode && isValidJopNameValue));
  }, [isValidJopNameValue, inviteCode]);

  return (
    <div className="entryContainer">
      <div className="entrySec">
        <h4>도서관 만들기</h4>
        <p>
          양진화님!
          <br />
          나만의 도서관을 만들어 보세요!
        </p>
        <button
          type="button"
          onClick={() => history.replace('/makeGroup')}
          className="Btn-md Btn-primary"
        >
          도서관 만들기
        </button>
      </div>

      <div className="entrySec">
        <h4>초대 수락하기</h4>
        <p>
          양진화님!
          <br />
          초대를 받으셨나요? <br />
          받으신 초대코드를 입력하세요!
        </p>

        <div>
          <InviteCodeInput setInviteCode={setInviteCode} />
          <JobNameInput setIsValidJopNameValue={setIsValidJopNameValue} setJobKey={setJobKey} />
        </div>
        <button
          type="button"
          onClick={handleJoinGroup}
          disabled={isInvitationBtnDisable}
          className="Btn-md Btn-primary"
        >
          초대 수락하기
        </button>
      </div>
    </div>
  );
}

export default RegisterEntry;
