import React from 'react';

function InvitationCodeErrorMessage() {
  return <div className="InputErrorMsg">초대 코드를 확인 후 입력해 주세요</div>;
}

function InviteCodeInput({ setInviteCode, isInvitationCodeValid, setIsInvitationCodeValid }) {
  function validInvitationCode(e) {
    const { value: invitationCode } = e.target;
    setInviteCode(invitationCode);
    setIsInvitationCodeValid(invitationCode.length > 1);
  }

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm"
        placeholder="초대코드 입력"
        onChange={validInvitationCode}
      />
      {!isInvitationCodeValid && <InvitationCodeErrorMessage />}
    </>
  );
}

export default InviteCodeInput;
