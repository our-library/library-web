import React from 'react';
import { useHistory, useLocation } from 'react-router';
import InvitationCodeContent from './contents/invitationCodeContent';
import Button from '../common/button';

function InvitationCodeModal() {
  const history = useHistory();
  const location = useLocation();
  const { title, subTitle, description } = location.state.data;
  const { groupInvitationKey } = location.state;

  return (
    <div className="ModalOverlay" onClick={() => history.goBack()}>
      <div className="ModalWrapper ModalAni_slide" onClick={(e) => e.stopPropagation()}>
        <h5 className="space-2x">
          <strong>{title}</strong>
        </h5>
        <p className="space-2x">{subTitle}</p>
        <p className="space-2x">{description}</p>
        {groupInvitationKey && <InvitationCodeContent groupInvitationKey={groupInvitationKey} />}
        <Button classType="transparent" size="md" handleClick={() => history.goBack()}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export default InvitationCodeModal;
