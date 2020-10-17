import React, { useState } from 'react';
import Icon from '../common/icon';

function BookSearchInput() {
  const [searchValue, setSearchValue] = useState('');

  function handleSearch(e) {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <div className="bookSearchBar">
      <Icon icon="search" classType="line" size="sm" color="primary" />
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="제목, 저자, 출판사를 검색해 보세요."
      />
    </div>
  );
}

export default BookSearchInput;
