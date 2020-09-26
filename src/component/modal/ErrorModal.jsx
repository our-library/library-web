import React from 'react';

function ErrorModal({ setIsOpenModal, errorType }) {
  const { title, description, isConfirmBtn, confirmBtnName } = errorType;

  function closeModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <div className="ModalOverlay">
        <div className="ModalWrapper ModalAni_pop" onClick={(e) => e.stopPropagation()}>
          <h5 className="space-2x">
            <strong>{title}</strong>
          </h5>
          <p className="space-2x">{description}</p>
          {isConfirmBtn && (
            <button type="button" onClick={closeModal} className="Btn-default Btn-md">
              {confirmBtnName}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default ErrorModal;
