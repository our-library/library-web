import React, {useEffect, useState, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import ReactPaginate from 'react-paginate';

import SearchSec from './searchSec';
import BookListCard from './bookListCard';
import {MENU} from "../../constants/menu";
import {CategorySelect} from "../common/categorySelect";
import {BOOK_CATEGORY} from "../../constants/bookCategory";
import {fetchBookList} from "../../store/api/book/get-book";
import {BOOK_STATUS} from "../../constants/bookStatus";
import {BOOK_SORT} from "../../constants/bookSort";
import {
  bookSearchValueAtom,
  bookSortValueAtom,
  isBookRentAvailableFilterAtom
} from "../../store/recoil/bookList";
import BookFilter from "./bookFilter";
import DoubleRightOutlined from "@ant-design/icons/lib/icons/DoubleRightOutlined";
import DoubleLeftOutlined from "@ant-design/icons/lib/icons/DoubleLeftOutlined";
import {mockBookData} from '../../constants/mockData/mockBookData';
import {currentUserGroupIdAtom} from "../../store/recoil/group";

function BookList() {
  const {AVAILABLE, RENTED, LOST} = BOOK_STATUS;
  const {CREATE_DESC, RENTAL_DESC, TITLE_ASC} = BOOK_SORT;
  const {BOOK_LIST_SELECT_MENU, BOOK_LIST_MENU} = MENU;
  const [selectValue, setSelectValue] = useState('');
  const [selectLargeCategoryKey, setSelectLargeCategoryKey] = useState(null);
  const [selectSmallCategoryKey, setSelectSmallCategoryKey] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [bookList, setBookList] = useState([]);
  const [pageOffset, setPageOffset] = useState(10);
  const [listStatus, setListStatus] = useState('');
  const pageLimitCount = useRef(100);
  const currentUserGroupId = useRecoilValue(currentUserGroupIdAtom);
  const searchBookValue = useRecoilValue(bookSearchValueAtom);
  const selectSortValue = useRecoilValue(bookSortValueAtom);
  const isRentAvailableChecked = useRecoilValue(isBookRentAvailableFilterAtom);

  function handleBookListMenu() {
  }

  function handlePageClick() {

  }


  function calculatePageCount(totalCount) {
    const pageCount = Math.ceil(totalCount / pageLimitCount);
    setPageCount(pageCount);
  }

  useEffect(() => {
    if (isRentAvailableChecked) {
      return setListStatus(AVAILABLE)
    }
  }, [isRentAvailableChecked]);

  useEffect(() => {
    if (currentUserGroupId) {
      const query = {
        groupId: currentUserGroupId,
        // page: pageOffset,
        title: searchBookValue,
        mainCategoryKey: selectLargeCategoryKey,
        subCategoryKey: selectSmallCategoryKey,
        status: listStatus,
        sort: selectSortValue,
      };
      fetchBookList(query)
        .then((response) => {
          const {count, results} = response;
          calculatePageCount(count);
          console.log('책목록 수: ', count);
          console.log('책목록 결과: ', results);
          setBookList(results);
        })
        .catch(err => console.log(err))
    }

  }, [searchBookValue, currentUserGroupId, selectSmallCategoryKey, listStatus, selectSortValue, isRentAvailableChecked]);

  // useEffect(() => {
  //   if(searchBookValue) {
  //     console.log(searchBookValue);
  //   }
  // },[searchBookValue]);

  function handleResetFilter() {

  }
  
  return (
    <div className="bookListContainer">
      <SearchSec/>
      <div className="bookListSec">
        <div className="bookListGrid">
          <div className="listFilterSec">

            <div style={{width: '90%', display: 'flex', flexDirection: 'row'}}>
              <CategorySelect
                type="default"
                categoryList={BOOK_CATEGORY}
                setSelectLargeCategoryKey={setSelectLargeCategoryKey}
                selectLargeCategory={selectLargeCategoryKey}
                defaultValue="대분류 카테고리"
              />
              <CategorySelect
                type="default"
                categoryList={BOOK_CATEGORY}
                setSelectLargeCategoryKey={setSelectLargeCategoryKey}
                selectLargeCategory={selectLargeCategoryKey}
                setSelectSmallCategoryKey={setSelectSmallCategoryKey}
                isSubCategory
                defaultValue="소분류 카테고리"
              />
              <BookFilter/>
              <button
                type="button"
                onClick={handleResetFilter}
              >
                초기화
              </button>
            </div>
          </div>


          {(bookList) ? (
            <div className="listContent">
              {bookList.map((list, i) => (
                <BookListCard key={i} bookList={list}/>
              ))}
            </div>
          ) : (
            <div className="noBookList">
              <h6><b>책 목록이 없습니다.</b></h6>
              <p>'책 등록'에서 원하시는 책을 등록해 보세요.</p>
            </div>
          )}


        </div>


        {(bookList && pageCount > 0) && (
          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={10}
            marginPagesDisplayed={2}
            containerClassName={'pagination'}
            pageLinkClassName={'pageBtn'}
            activeClassName={'activePage'}
            previousLabel={<DoubleLeftOutlined/>}
            nextLabel={<DoubleRightOutlined/>}
            onPageChange={handlePageClick}
          />
        )}

      </div>
    </div>
  );
}

export default BookList;
