import React from 'react';
import { famousSaying } from '../../constants/famousSaying';
import BookSearchInput from './bookSearchInput';

function FamousSayingSec() {
  // TODO...
  const n = 0;
  const { content, author } = famousSaying[n];
  return (
    <div className="famousSayingSec">
      <p className="space-2x">{content}</p>
      <p>- {author}</p>
    </div>
  );
}

function SearchSec() {
  return (
    <div className="bookSearchContainer">
      <div>
        <h5 className="space-3x">
          진화님, <br />
          이번엔 어떤 책을 읽어볼까요?
        </h5>
        <BookSearchInput />
        <button type="button">책 신청하기</button>
      </div>
      <FamousSayingSec />
    </div>
  );
}

export default SearchSec;
