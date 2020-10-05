import React from 'react';
import BookSearchInput from '../bookList/bookSearchInput';
import SearchResultCard from './searchResultCard';

function AddBooks() {
  return (
    <div className="bookListContainer">
      <div className="bookSearchContainer">
        <div>
          <h5 className="space-3x">검색을 통해 책을 등록해 주세요.</h5>
          <BookSearchInput />
        </div>
      </div>
      <div className="bookSearchResultContainer">
        <div className="bookSearchResultSec">
          <SearchResultCard />
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
