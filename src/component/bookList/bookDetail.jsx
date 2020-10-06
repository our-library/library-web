import React from 'react';
import { useHistory, useLocation } from 'react-router';
import Tabs from '../common/tabs';

const bookDetailMenu = [
  {
    key: 'recentReply',
    value: '최근 후기',
  },
  {
    key: 'myRecord',
    value: '나의 기록',
  },
];

function BookDetail() {
  const history = useHistory();
  const location = useLocation();
  const { title, author, publisher, content, datetime, label } = location.state.mockBookList;

  function handleBookDetailMenu() {}

  return (
    <div className="bookDetailContainer">
      <div className="bookDetailInfoSec">
        <div className="goBackSec space-4x">
          <button type="button" onClick={() => history.goBack()}>
            뒤로가기
          </button>
        </div>
        <div className="infoSec">
          <div className="bookImg">
            <img src="" alt="책이미지" />
          </div>
          <div>
            <span className="tag space-2x">{label}</span>
            <h6 className="space-3x">
              <strong>{title}</strong>
            </h6>
            <p className="space-3x">
              {author} • {publisher} • {datetime}
            </p>
            <p className="space-3x">{content}</p>
            <button type="button" className="Btn-primary Btn-md">
              대여하기
            </button>
          </div>
        </div>
        <Tabs menuArr={bookDetailMenu} handleMenu={handleBookDetailMenu} />
        <div className="bookDetailSubSec" />
      </div>
    </div>
  );
}

export default BookDetail;
