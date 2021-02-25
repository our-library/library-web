import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import BookSearchInput from '../bookList/bookSearchInput';
import SearchResultCard from './searchResultCard';
import {GetBookByKaKaoApi} from "../../store/api";
import TextButton from "../common/textButton";
import {ROUTE_PATH} from "../../constants/path";
import {Link} from "react-router-dom";
import AddBookSearchInput from "./addBookSearchInput";
import {addBookSearchValueAtom} from "../../store/recoil/bookList";

function AddBooks() {
  const [searchBookList, setSearchBookList] = useState(null);
  // const [searchValue, setSearchValue] = useState('');
  const searchValue = useRecoilValue(addBookSearchValueAtom);
  const [isNoExistResult, setIsNoExistResult] = useState(false);
  const {SERVICE_REGISTER_ORIGIN_BOOK} = ROUTE_PATH;

  let id = 0;

  useEffect(() => {
    if (searchValue) {
      GetBookByKaKaoApi(searchValue).then(response => {
        console.log(response);
        const resultBookList = Object.values(response);
        setSearchBookList(resultBookList[0]);

        if (!resultBookList[0].length) {
          setIsNoExistResult(true);
        }
      })
    }
  }, [searchValue]);

  return (
    <div className="bookListContainer">
      <div className="bookSearchContainer">
        <div>
          <h5 className="space-3x">검색을 통해 책을 등록해 주세요.</h5>
          <AddBookSearchInput/>
        </div>
      </div>
      <div className="bookSearchResultContainer">
        <div className="bookSearchResultSec">
          {searchBookList ?
            searchBookList.map(list => {
              id++;
              return (
                <SearchResultCard key={id} list={list}/>
              )
            })
            :
            <div className="noSearchResultSec">
              <h6>
                등록할 책을 검색해 보세요! <br/>
                보다 쉽게 책을 등록할 수 있습니다.
              </h6>
            </div>
          }
          {isNoExistResult && (
            <div className="noSearchResultSec">
             <h6 className="space-1x">
               <strong>'{searchValue}'</strong> 검색 결과가 없습니다. <br/>
               책을 직접 등록하시겠어요?
             </h6>
              <Link to={{
                pathname: SERVICE_REGISTER_ORIGIN_BOOK,
                state: {searchValue: searchValue}
              }}>
                <TextButton>
                  등록하기
                </TextButton>
              </Link>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
