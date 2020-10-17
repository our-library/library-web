import React from 'react';
import Button from '../common/button';

function ErrorModal({ setIsOpenModal, errorType }) {
  const { title, description, isConfirmBtn, confirmBtnName } = errorType;

  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <div className="ModalOverlay">
      <div className="ModalWrapper ModalAni_pop">
        <h5 className="space-2x">
          <strong>{title}</strong>
        </h5>
        <p className="space-2x">{description}</p>
        {isConfirmBtn && (
          <Button classType="transparent" size="md" handleClick={closeModal}>
            {confirmBtnName}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ErrorModal;
