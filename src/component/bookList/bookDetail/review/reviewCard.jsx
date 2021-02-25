import React, {useEffect, useState} from 'react';
import * as Moment from 'moment';
import MoreOutlined from "@ant-design/icons/lib/icons/MoreOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

function ReviewCard(props) {
  const { title, user, createdAt, updatedAt, score, bookId, reviewId, content} = props.data;
  const createTime = Moment(createdAt).format('YYYY-MM-DD');
  const [isOpenMoreBtn, setIsOpenMoreBtn] = useState(false);

  return (
    <div className="reviewCard">
      <div style={{backgroundImage: `url('')`}} className="profileImg"/>
      <div className="reviewContents">
        <div className="reviewHeader">
          <div>
            <span>{user.name}</span>
            <span className="dateTime">• {createTime}</span>
          </div>
          <div className="dropdownBtnWrap">
            <div className="moreBtnIcon" onClick={() => setIsOpenMoreBtn(!isOpenMoreBtn)}>
              <MoreOutlined style={{fontSize: '15px'}}/>
              {isOpenMoreBtn && (
                <ul className="moreBtnSec">
                  <li className="moreBtnList">
                    <button type="button">
                      <EditOutlined style={{marginRight: '8px'}} />
                      수정
                    </button>
                  </li>
                  <li className="moreBtnList">
                    <button type="button">
                      <DeleteOutlined style={{marginRight: '8px'}} />
                      삭제
                    </button>
                  </li>
                </ul>
              )}
            </div>

          </div>
        </div>
        <div className="reviewText">
          <p dangerouslySetInnerHTML={{__html: content}}/>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
