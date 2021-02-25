import React, {useState, useEffect, useRef} from 'react';
import {useRecoilValue} from 'recoil';
import AutoTextArea from "../../../common/autoTextArea";
import Button from "../../../common/button";
import ReviewCard from "../review/reviewCard";
import {mockReviewData} from '../../../../constants/mockData/mockReviewData';

function MyBookReview() {
  const [myReviewContents, setMyReviewContents] = useState('');

  function handleMyReviewContents(e) {
    setMyReviewContents(e.target.value);
  }

  function handleAddMyReview() {

  }

  return (
    <div className="bookReviewContainer">
      <div className="myReviewInfoSec">
        <p>개인적인 책 감상 또는 기록을 남기는 곳입니다. <br/>
        <strong>[나의 대여] - [대여 기록]</strong> 탭에서 열람 가능하며 작성자 본인에게만 공개됩니다.</p>
      </div>
      <div className="reviewAddSec">
        <AutoTextArea
          className="reviewAddContentInput"
          placeholder="책에 대한 기록을 작성해 보세요..."
          value={myReviewContents}
          isfocus="true"
          onChange={handleMyReviewContents}
        />
        <div className="addControlSec">
          <Button
            classType="default"
            size="sm"
            handleClick={handleAddMyReview}
          >
            나의 기록 작성
          </Button>
        </div>
      </div>


      {mockReviewData.map(reviewList => {
        return (
          <ReviewCard key={reviewList.reviewId} data={reviewList} />
        )
      })}
    </div>
  )
}

export default MyBookReview
