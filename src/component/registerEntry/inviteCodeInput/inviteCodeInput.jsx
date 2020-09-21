import React from 'react';

function InviteCodeErrorMessage() {
  return (
    <div className="InputErrorMsg">
     초대코드를 입력하세요.
    </div>
  )
}

function InviteCodeInput({setInviteCode}) {

  function validInviteCode(e) {
    const inviteCode = e.target.value;
    setInviteCode(inviteCode);
  }

  return (
    <>
      <input
        type="text"
        className="InputText Input-sm"
        placeholder="초대코드 입력"
        onChange={validInviteCode}
      />
    </>
  )
}

export default InviteCodeInput
