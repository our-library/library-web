import React, {useRef} from 'react';
import SearchSec from "./searchSec";
import BookListCard from "./bookListCard";
import {mockBookData} from "../../constants/mockBookData";
import Tabs from "../common/tabs";

const bookListMenu = [
  {
    key: 'all',
    value: '전체 책 목록',
  },
  {
    key: 'recentBook',
    value: '최근 비치된 책'
  },
  {
    key: 'recentReply',
    value: '최근 후기'
  }
];

function BookList() {
  function handleBookListMenu(e) {
    console.log('click!');
  }

  return (
    <div className="bookListContainer">
      <SearchSec/>
      <Tabs menuObj={bookListMenu} handleMenu={handleBookListMenu}/>
      <div className="bookListSec">
       <div className="bookListGrid">
         <div className="listFilterSec">
           <div className="selectorSec">
             <span className="label">카테고리</span>
             <select
               className="selector"
               name=""
               id=""
               defaultValue="all">
               <option value="all">전체</option>
               <option value="1">최다 대여순</option>
               <option value="2">대여 및 예약 가능</option>
               <option value="2">대여 불가능</option>
             </select>
           </div>
           <div className="filterSec">
             ...
           </div>
         </div>
         <div className="listContent">
           {mockBookData.map((list, i) => {
             return (
               <BookListCard key={i} mockBookList={list}/>
             )
           })}
         </div>
       </div>
      </div>
    </div>
  );
}

export default BookList;
