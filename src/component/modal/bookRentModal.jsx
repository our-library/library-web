import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as moment from 'moment';

function BookRentModal() {
  const history = useHistory();
  const location = useLocation();
  const {
    title,
    author,
    publisher,
    content,
    datetime,
    label,
    status,
  } = location.state.mockBookList;
  const [rentTime, setRentTime] = useState('');
  const rentDuration = 7;

  useEffect(() => {
    setRentTime(moment().add(rentDuration, 'd').format('YYYY.MM.DD'));
  }, [rentDuration]);

  return (
    <div className="ModalOverlay" onClick={() => history.goBack()}>
      <div className="ModalWrapper ModalAni_slide" onClick={(e) => e.stopPropagation()}>
        <h6 className="space-2x">
          <strong>아래 책을 대여하시겠습니까?</strong>
        </h6>
        <div className="bookRentModalSec">
          <div className="bookInfo">
            <div className="bookImg space-2x">
              <img src="" alt="책이미지" />
            </div>
            <div>
              <span className="tag">{label}</span>
              <p className="space-2x title">{title}</p>
              <p className="subTitle space-2x">
                {author} • {publisher} • {datetime}
              </p>
            </div>
          </div>
          <p className="space-2x content">{content}</p>
          <div className="rentInfoSec space-3x">
            <div className="rentInfoTable">
              <span className="th">대여일</span>
              <span>
                <strong>{moment().format('YYYY.MM.DD')}</strong>
              </span>
            </div>
            <div className="rentInfoTable">
              <span className="th">대여기간</span>
              <span>
                <strong>7일</strong>
              </span>
            </div>
            <div className="rentInfoTable">
              <span className="th">반납예정일</span>
              <span>
                <strong>{rentTime}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="btnSec">
          {status === 'rented' && (
            <button type="button" onClick={() => history.goBack()} className="Btn-default Btn-md">
              예약하기
            </button>
          )}
          {status === 'available' && (
            <button type="button" onClick={() => history.goBack()} className="Btn-default Btn-md">
              대여하기
            </button>
          )}
          <button type="button" onClick={() => history.goBack()} className="Btn-transparent Btn-md">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookRentModal;
