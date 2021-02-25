import React, { useState } from 'react';
import {useSetRecoilState, useRecoilState} from 'recoil';
import Icon from '../common/icon';
import {handleEnterKeyPress} from "../../utils/handleKeyPress";
import {bookSearchValueAtom} from "../../store/recoil/bookList";
import CloseCircleFilled from "@ant-design/icons/lib/icons/CloseCircleFilled";

function BookSearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [bookSearchValue, setBookSearchValue] = useRecoilState(bookSearchValueAtom);

  function handleSearch(e) {
    const { value } = e.target;
    setInputValue(value);
    if(!inputValue) {
      setBookSearchValue('');
    }
  }

  function handleSearchBook() {
    setBookSearchValue(inputValue);
  }

  function handleResetSearchValue() {
    if(inputValue) {
      setInputValue('');
      setBookSearchValue('');
    }
  }

  return (
    <div className="bookSearchBar">
      <button onClick={handleSearchBook}>
        <Icon
          icon="search"
          classType="line"
          size="sm"
          color="primary"
        />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleSearch}
        placeholder="제목, 저자, 출판사를 검색해 보세요."
        onKeyPress={e => handleEnterKeyPress(e, handleSearchBook)}
      />
      {inputValue && (
        <div className="searchResetIcon" onClick={handleResetSearchValue}>
          <CloseCircleFilled style={{fontSize: '16px'}}/>
        </div>
      )}
    </div>
  );
}

export default BookSearchInput;
