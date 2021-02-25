import React from 'react';
import { useLocation } from 'react-router';
import * as moment from 'moment';

import { Link } from 'react-router-dom';
import { BOOK_STATUS } from '../../constants/bookStatus';
import {ROUTE_PATH} from "../../constants/path";
import Button from "../common/button";

function BookListCard({ bookList }) {
  const { AVAILABLE, RENTED } = BOOK_STATUS;
  const location = useLocation();
  const { title, author, bookId, status, publisher, datetime, label, thumbnailURL } = bookList;
  const {SERVICE_BOOK_LIST, SERVICE_BOOK_LIST_RESERVATION} = ROUTE_PATH;
  const dateTime = moment(datetime).format('YYYY-MM-DD');

  function handleBookReservation() {
    // 예약...

  }

  return (
    <div className="listCard">
      <div
        style={{backgroundImage: `url(${thumbnailURL})`}}
        className="bookImg space-2x"
      />
      <div>
        <div className="tag">
          <span className="tagText">{label}</span>
        </div>
        <Link
          to={{
            pathname: `/service/book-list/${bookId}`,
            state: {
              bookList,
            },
          }}
        >
         <div className="title">
           <p className="titleText">{title}</p>
         </div>
        </Link>
        <p className="subTitle space-1x">
          {author} • {publisher}
        </p>
      </div>
      <div className="listCardBtnSec">
        {status === AVAILABLE && (
          <Link
            to={{
              pathname: `${SERVICE_BOOK_LIST}/${bookId}`,
              state: {
                background: location,
                bookList,
              },
            }}
          >
            <Button classType="default">
              대여하기
            </Button>
          </Link>
        )}
        {status === RENTED && (
          <Link
            to={{
              pathname: `${SERVICE_BOOK_LIST_RESERVATION}/${bookId}`,
              state: {
                background: location,
                bookList,
              }
            }}
          >
            <Button
              handleClick={handleBookReservation}
              classType="blue"
            >
              예약하기
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default BookListCard;
