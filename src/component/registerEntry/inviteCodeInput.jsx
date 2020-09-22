import React from 'react';

function InviteCodeInput({setInviteCode}) {

  function validInvitationCode(e) {
    const {value: invitationCode} = e.target;
    setInviteCode(invitationCode);
  }

  return (
    <input
      type="text"
      className="InputText Input-sm"
      placeholder="초대코드 입력"
      onChange={validInvitationCode}
    />
  )
}

export default InviteCodeInput
