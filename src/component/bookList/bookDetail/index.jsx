import React, {useState} from 'react';
import { useHistory, useLocation } from 'react-router';
import Tabs from '../../common/tabs';
import {rentBookApi} from "../../../store/api/rent/rent-book";
import SnackBar from "../../common/snackBar";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import SettingTab, {SettingTabComponent} from "../../setting/settingTab";
import BookReview from "./review";
import MyBookReview from "./ myReview";


function BookDetail() {
  const history = useHistory();
  const location = useLocation();
  const { title, author, bookId, publisher, content, datetime, label } = location.state.bookList;
  const [showSnackBar, setShowSnackBar] = useState(false);

  function handleBookDetailMenu() {

  }

  function handleRentalConfirm() {
    rentBookApi(bookId)
      .then(() => console.log('대여완료'))
      .catch(err => console.log(err));
  }

  return (
    <div className="bookDetailContainer">
      <div className="bookDetailInfoSec">
        <div className="goBackSec space-4x">
          <button type="button" onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{fontSize: '20px'}}/>
          </button>
        </div>
        <div className="infoSec">
          <div className="bookImg" >
            <img src="" alt="책이미지" />
          </div>
          <div className="content">
            <div className="space-1x">
              <span className="tag">{label}</span>
            </div>
            <h6 className="space-3x">
              <strong>{title}</strong>
            </h6>
            <p className="space-3x">
              {author} • {publisher} • {datetime}
            </p>
            <p className="space-3x">{content}</p>
            <button
              type="button"
              className="Btn-primary Btn-md"
              onClick={handleRentalConfirm}
            >
              대여하기
            </button>
          </div>
        </div>

      </div>

      <SettingTab>
        <SettingTabComponent
          key="recentReply"
          value="최근 후기"
          component={<BookReview />}
        />
        <SettingTabComponent
          key="myRecord"
          value="나의 기록"
          component={<MyBookReview />}
        />
      </SettingTab>

      <SnackBar
        showSnackBar={showSnackBar}
        setShowSnackBar={setShowSnackBar}
      >
        저장되었습니다!
      </SnackBar>
    </div>
  );
}

export default BookDetail;
