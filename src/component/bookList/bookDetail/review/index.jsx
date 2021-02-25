import React, {useState, useEffect, useRef} from 'react';
import {useRecoilValue} from 'recoil';
import {mockReviewData} from '../../../../constants/mockData/mockReviewData';

import ReviewCard from "./reviewCard";
import AutoTextArea from "../../../common/autoTextArea";
import Button from "../../../common/button";

function BookReview() {
  const [reviewContents, setReviewContents] = useState('');

  useEffect(() => {

  }, []);

  function handleReviewContents(e) {
    setReviewContents(e.target.value);
  }

  function handleAddReview() {

  }

  return (
    <div className="bookReviewContainer">
      <div className="reviewAddSec">
        <AutoTextArea
          className="reviewAddContentInput"
          placeholder="후기를 작성해 보세요..."
          value={reviewContents}
          isfocus="true"
          onChange={handleReviewContents}
        />
        <div className="addControlSec">
          <Button
            classType="default"
            size="sm"
            handleClick={handleAddReview}
          >
            후기 작성
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

export default BookReview
