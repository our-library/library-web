import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as moment from 'moment';
import { BOOK_STATUS } from '../../constants/bookStatus';
import Button from '../common/button';

function BookRentModal() {
  const { AVAILABLE, RENTED } = BOOK_STATUS;
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
  // TODO rentDuration comes from Api
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
          {status === RENTED && (
            <Button classType="blue" size="md" handleClick={() => history.goBack()}>
              예약하기
            </Button>
          )}
          {status === AVAILABLE && (
            <Button classType="default" size="md" handleClick={() => history.goBack()}>
              대여하기
            </Button>
          )}
          <Button classType="transparent" size="md" handleClick={() => history.goBack()}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BookRentModal;
