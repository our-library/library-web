import React from 'react';
import {useHistory, useLocation, useParams} from "react-router";
import Tabs from "../common/tabs";

const bookDetailMenu = [
  {
    key: 'recentReply',
    value: '최근 후기'
  },
  {
    key: 'myRecord',
    value: '나의 기록'
  }
];

function BookDetail() {
  const history = useHistory();
  const location = useLocation();
  const {
    title,
    isbn,
    author,
    publisher,
    content,
    datetime,
    label,
    thumbnailURL,
    type,
    bookLink,
    status,
  } = location.state.mockBookList;

  function handleBookDetailMenu() {
    console.log('click!');
  }

  return (
    <div className="bookDetailContainer">
      <div className="bookDetailInfoSec">
        <div className="goBackSec space-4x">
          <button onClick={() => history.goBack()}>뒤로가기</button>
        </div>
        <div className="infoSec">
          <div className="bookImg">
            <img src="" alt="책이미지"/>
          </div>
          <div>
            <span className="tag space-2x">{label}</span>
            <h6 className="space-3x"><strong>{title}</strong></h6>
            <p className="space-3x">{author} • {publisher} • {datetime}</p>
            <p className="space-3x">{content}</p>
            <button className="Btn-primary Btn-md">대여하기</button>
          </div>
        </div>
        <Tabs menuObj={bookDetailMenu} handleMenu={handleBookDetailMenu}/>
        <div className="bookDetailSubSec">

        </div>
      </div>
    </div>
  )
}

export default BookDetail
