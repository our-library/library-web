import React, { useRef } from 'react';

function InvitationCodeContent({ groupInvitationKey }) {
  const copyText = useRef(groupInvitationKey);

  function copyToClipboard() {
    const selectCode = copyText.current;
    selectCode.select();
    document.execCommand('copy');
  }

  return (
    <div className="invitationCodeBox">
      <p className="inviteTag">
        <small>
          <b>초대코드</b>
        </small>
      </p>
      <textarea
        name="invitationCodeInput"
        className="invitationCodeInput"
        value={groupInvitationKey}
        rows={1}
        ref={copyText}
        readOnly
      />

      <button type="button" onClick={copyToClipboard}>
        복사
      </button>
    </div>
  );
}

export default InvitationCodeContent;
