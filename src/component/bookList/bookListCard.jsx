import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

function BookListCard({ mockBookList }) {
  const location = useLocation();
  const {
    title,
    author,
    bookId,
    status,
    publisher,
    datetime,
    label,
  } = mockBookList;

  return (
    <div className="listCard">
      <div className="bookImg space-2x">
        <img src="" alt="책이미지" />
      </div>
      <div>
        <span className="tag">{label}</span>
        <Link
          to={{
            pathname: `/service/book-list/${bookId}`,
            state: {
              mockBookList,
            },
          }}
        >
          <p className="title">{title}</p>
        </Link>
        <p className="subTitle space-2x">
          {author} • {publisher} • {datetime}
        </p>
      </div>
      <div className="listCardBtnSec">
        {status === 'available' && (
          <Link
            to={{
              pathname: `/service/book-list/${bookId}`,
              state: {
                background: location,
                mockBookList,
              },
            }}
          >
            <button type="button" className="Btn-default Btn-sm">대여하기</button>
          </Link>
        )}
        {status === 'rented' && <button type="button" className="Btn-blue Btn-sm">예약하기</button>}
      </div>
    </div>
  );
}

export default BookListCard;
