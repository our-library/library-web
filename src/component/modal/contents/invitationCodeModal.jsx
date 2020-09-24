import React from 'react';

function InvitationCodeModal({groupInvitationKey}) {

  function copyToClipboard() {
    const copyText = document.getElementById('copyText');
    copyText.select();
    document.execCommand('copy');
    console.log(document.execCommand('copy'));
  }

  return (
    <div className="invitationCodeBox">
      <p className="inviteTag"><small><b>초대코드</b></small></p>
      <textarea
        name='invitationCodeInput'
        id='copyText'
        className="invitationCodeInput"
        value={groupInvitationKey}
        rows={1}
        readOnly
      />

      <button onClick={copyToClipboard}>복사
      </button>
    </div>
  )
}

export default InvitationCodeModal
