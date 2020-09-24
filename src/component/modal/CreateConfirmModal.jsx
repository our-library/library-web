import React from 'react';
import { useHistory, useLocation } from 'react-router';
import InvitationCodeModal from './contents/invitationCodeModal';

function CreateConfirmModal() {
  const history = useHistory();
  const location = useLocation();
  const { title, subTitle, description, isConfirmBtn, isCloseBtn } = location.state.data;
  const { groupInvitationKey } = location.state;

  return (
    <>
      <div className="ModalOverlay" onClick={() => history.goBack()}>
        <div className="ModalWrapper ModalAni_slide" onClick={(e) => e.stopPropagation()}>
          <h5 className="space-2x">
            <strong>{title}</strong>
          </h5>
          <p className="space-2x">{subTitle}</p>
          <p className="space-2x">{description}</p>
          {groupInvitationKey && <InvitationCodeModal groupInvitationKey={groupInvitationKey} />}
          {isConfirmBtn && (
            <button type="button" onClick={() => history.goBack()} className="Btn-default Btn-md">
              확인
            </button>
          )}
          {isCloseBtn && (
            <button
              type="button"
              onClick={() => history.goBack()}
              className="Btn-transparent Btn-md"
            >
              닫기
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateConfirmModal;
