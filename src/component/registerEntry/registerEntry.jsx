import React, {useState, useEffect} from 'react';
import {useHistory, useRouteMatch} from "react-router";
import InviteCodeInput from "./inviteCodeInput";
import JobNameInput from "./jobNameInput";
import {Api} from "../../store/api";

function RegisterEntry() {
  const history = useHistory();
  const [jobKey, setJobKey] = useState('');
  const [inviteCode, setInviteCode] = useState('');

  function handleJoinGroup() {
    const data = {
      "invitationKey": inviteCode,
      "jobKey": jobKey
    };
    Api.fetch({
      url: '/groups/join',
      method: 'post',
      data: data
    })
      .then((data) => {
        const {groupId, memberId} = data;
        console.log('join group!');
        history.push('/service');
        })
  }

  return (
    <div className="entryContainer">
      <div className="entrySec">
        <h4>도서관 만들기</h4>
        <p>양진화님! <br/>
          나만의 도서관을 만들어 보세요!
        </p>
        <button
          onClick={() => history.replace('/makeGroup')}
          className="Btn-md Btn-primary">
          도서관 만들기
        </button>
      </div>

      <div className="entrySec">
        <h4>초대 수락하기</h4>
        <p>양진화님! <br/>
          초대를 받으셨나요? <br/>
          받으신 초대코드를 입력하세요!
        </p>

        <div>
          <InviteCodeInput setInviteCode={setInviteCode}/>
          <JobNameInput setJobKey={setJobKey}/>
        </div>
        <button
          onClick={handleJoinGroup}
          className="Btn-md Btn-primary">초대 수락하기
        </button>
      </div>
    </div>
  )
}

export default RegisterEntry
