import React, { useState } from 'react';
import {useSetRecoilState} from 'recoil';
import Icon from '../common/icon';
import {handleEnterKeyPress} from "../../utils/handleKeyPress";
import {addBookSearchValueAtom} from "../../store/recoil/bookList";

function AddBookSearchInput() {
  const [inputValue, setInputValue] = useState('');
  const setAddBookSearchValue = useSetRecoilState(addBookSearchValueAtom);

  function handleSearch(e) {
    const { value } = e.target;
    setInputValue(value);
  }

  function handleSearchBookByKAKAO() {
    setAddBookSearchValue(inputValue);
  }

  return (
    <div className="bookSearchBar">
      <button onClick={handleSearchBookByKAKAO}>
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
        onKeyPress={e => handleEnterKeyPress(e, handleSearchBookByKAKAO)}
      />
    </div>
  );
}

export default AddBookSearchInput;
