import React from 'react';
import {useRecoilValue} from 'recoil';
import { famousSaying } from '../../constants/famousSaying';
import BookSearchInput from './bookSearchInput';
import {currentUserNameAtom} from "../../store/recoil/user";

function FamousSayingSec() {
  // TODO famousSaying logic is not completed
  const n = 0;
  const { content, author } = famousSaying[n];

  return (
    <div className="famousSayingSec">
      <p className="space-2x" dangerouslySetInnerHTML={{__html: content}}/>
      <p>- {author}</p>
    </div>
  );
}

function SearchSec() {
  const currentUserName = useRecoilValue(currentUserNameAtom);

  return (
    <div className="bookSearchContainer">
      <div>
        <h5 className="space-3x">
          {currentUserName}님, <br />
          이번엔 어떤 책을 읽어볼까요?
        </h5>
        <BookSearchInput />
      </div>
      <FamousSayingSec />
    </div>
  );
}

export default SearchSec;
