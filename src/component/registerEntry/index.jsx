import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import InviteCodeInput from './inviteCodeInput';
import JobNameInput from './jobNameInput';
import { joinGroupRequest } from '../../store/api/groupApi';
import { fetchUserName } from '../../store/api/usersApi';
import { ROUTE_PATH } from '../../constants/path';
import ErrorModal from '../modal/errorModal';
import { ERROR_MODAL_DATA } from '../../constants/modal';

function RegisterEntry() {
  const history = useHistory();
  const { MAKE_GROUP, SERVICE } = ROUTE_PATH;
  const { INVITATION_CODE_ERROR } = ERROR_MODAL_DATA;
  const [jobKey, setJobKey] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isJobNameKeyValid, setIsJobNameKeyValid] = useState(true);
  const [isInvitationCodeValid, setIsInvitationCodeValid] = useState(true);
  const [isInvitationBtnDisable, setIsInvitationBtnDisable] = useState(true);
  const [openInvitationCodeErrorModal, setOpenInvitationCodeErrorModal] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getUserName();
  }, []);

  async function getUserName() {
    const name = await fetchUserName();
    setUserName(name);
  }

  async function handleJoinGroup() {
    try {
      await joinGroupRequest(inviteCode, jobKey);
      history.push(SERVICE);
    } catch (e) {
      setOpenInvitationCodeErrorModal(true);
    }
  }

  useEffect(() => {
    setIsInvitationBtnDisable(!(inviteCode && isJobNameKeyValid));
  }, [isJobNameKeyValid, inviteCode]);

  return (
    <div className="entryContainer">
      <div className="entrySec">
        <h4>도서관 만들기</h4>
        <p>
          {userName}님,
          <br />
          나만의 도서관을 만들어 보세요!
        </p>
        <button
          type="button"
          onClick={() => history.replace(MAKE_GROUP)}
          className="Btn-md Btn-primary"
        >
          도서관 만들기
        </button>
      </div>

      <div className="entrySec">
        <h4>초대 수락하기</h4>
        <p>
          {userName}님,
          <br />
          초대를 받으셨나요? <br />
          받으신 초대코드를 입력하세요!
        </p>

        <div className="entryInputSec">
          <InviteCodeInput
            setInviteCode={setInviteCode}
            isInvitationCodeValid={isInvitationCodeValid}
            setIsInvitationCodeValid={setIsInvitationCodeValid}
          />
          <JobNameInput
            isJobNameKeyValid={isJobNameKeyValid}
            setIsJobNameKeyValid={setIsJobNameKeyValid}
            setJobKey={setJobKey}
          />
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
      {openInvitationCodeErrorModal && (
        <ErrorModal
          errorType={INVITATION_CODE_ERROR}
          setIsOpenModal={setOpenInvitationCodeErrorModal}
        />
      )}
    </div>
  );
}

export default RegisterEntry;
