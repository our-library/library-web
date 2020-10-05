import React, {useState} from 'react';
import searchIcon from '../../../assets/Icon/search-bar.svg'

function BookSearchInput() {
  const [searchValue, setSearchValue] = useState('');

  function handleSearch(e) {
    const {value: searchValue} = e.target;
    setSearchValue(searchValue);
  }

  return (
    <div className="bookSearchBar">
      <img src={searchIcon} alt="icon" className="searchIcon"/>
      <input
        type="text"
        className=""
        value={searchValue}
        onChange={handleSearch}
        placeholder="제목, 저자, 출판사를 검색해 보세요."
      />
    </div>
  )
}

export default BookSearchInput
