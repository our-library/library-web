import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from "react-router";
import * as moment from 'moment';
import {useRecoilValue} from 'recoil';
import Button from "../common/button";
import TextInput from "../common/textInput";
import {mockSearchResult} from "../../constants/mockData/mockBookSearchResult";
import {Select} from "../common/select";
import {BOOK_CATEGORY, BOOK_TYPE_LIST} from "../../constants/bookCategory";
import {CategorySelect} from "../common/categorySelect";
import {ROUTE_PATH} from "../../constants/path";
import {Api} from "../../store/api";
import {registerBook} from "../../store/api/book/add-book";
import ArrowLeftOutlined from "@ant-design/icons/lib/icons/ArrowLeftOutlined";
import {currentUserGroupIdAtom} from "../../store/recoil/group";


export function RegisterInputSet(props) {
  const {children, labelValue} = props;
  
  function RegisterLabel(props) {
    const {value} = props;
    return (
      <div className="inputLabel">
        <strong>{value}</strong>
      </div>
    )
  }
  
  return (
    <div style={{marginBottom: '12px', display:'flex', flexDirection: 'row'}}>
      <RegisterLabel value={labelValue}/>
      {children}
    </div>
  )
}


function RegisterBook() {
  const history = useHistory();
  const location = useLocation();
  const {list} = location.state;
  const {
    authors,
    contents,
    datetime,
    publisher,
    thumbnail,
    title,
    isbn,
    translators,
  } = list;
  const {SERVICE_ADD_BOOKS, SERVICE_BOOK_LIST} = ROUTE_PATH;

  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthors, setBookAuthors] = useState('');
  const [bookTranslators, setBookTranslators] = useState('');
  const [bookPublisher, setBookPublisher] = useState('');
  const [bookLabel, setBookLabel] = useState('');
  const [selectLargeCategoryKey, setSelectLargeCategoryKey] = useState('');
  const [selectSmallCategoryKey, setSelectSmallCategoryKey] = useState('');
  const [kindOfBook, setKindOfBook] = useState('paper');
  const [bookDateTime, setBookDateTime] = useState('');
  const [bookLink, setBookLink] = useState('');
  const groupId = useRecoilValue(currentUserGroupIdAtom);


  useEffect(() => {
    setBookTitle(title);
    setBookAuthors(authors.join(', '));
    setBookPublisher(publisher);
    const dateTime = moment(datetime).format('YYYY-MM-DD');
    setBookDateTime(dateTime);
  }, []);


  function handleRegisterBook() {
    //translators 필요
    const bookData = {
      isbn: isbn,
      author: bookAuthors,
      publisher: bookPublisher,
      content: contents,
      label: bookLabel,
      datetime: bookDateTime,
      thumbnailURL: thumbnail,
      bookLink: bookLink,
      mainCategoryKey: selectLargeCategoryKey,
      subCategoryKey: selectSmallCategoryKey,
      groupId: groupId,
      title: bookTitle,
      type: kindOfBook
    };
    registerBook(bookData)
      .then(response => {
        window.alert('책추가 완료');
        console.log('bookId: ',response);
        history.replace(SERVICE_BOOK_LIST);
      })
      .catch(err => console.log(err))
  }

  function handleBookDatetime(e) {
    const value = e.target;
    const newDatetime = moment(value).format('YYYY-MM-DD');
    setBookDateTime(newDatetime);
  }

  return (
    <div className="bookDetailContainer">
      <div className="bookDetailInfoSec">
        <div className="goBackSec space-4x">
          <button type="button" onClick={() => history.goBack()}>
            <ArrowLeftOutlined style={{fontSize: '20px'}}/>
          </button>
        </div>

        <div className="infoSec">
          <div
            className="bookImg"
            style={{backgroundImage: `url(${thumbnail})`}}
          />
          <div className="content">
            <h6 className="space-2x">
              <strong><span>{title}</span></strong>
            </h6>
            <p className="space-2x">
              <span>{authors.join(', ')} • 옮긴이 {translators.join(', ')} • {publisher} • {bookDateTime}</span>
            </p>
            <p className="space-2x">
              <span>ISBN </span><strong><span>{isbn}</span></strong>
            </p>
            <p className="space-3x">{contents}</p>
          </div>
        </div>

      </div>

      <div className="registerBookSec">
        <RegisterInputSet labelValue="책 이름">
          <TextInput
            value={bookTitle}
            maxLength={100}
            onChange={e => setBookTitle(e.target.value)}
            placeholder="1자 ~ 100자 이내로 입력"
          />
        </RegisterInputSet>

        <RegisterInputSet labelValue="작가 이름">
          <TextInput
            value={bookAuthors}
            maxLength={100}
            onChange={e => setBookAuthors(e.target.value)}
            placeholder="저자명 (,로 여러명 구분 가능)"
          />
        </RegisterInputSet>

        <RegisterInputSet labelValue="옮긴이">
          <TextInput
            value={bookTranslators}
            maxLength={100}
            onChange={e => setBookTranslators(e.target.value)}
            placeholder="옮긴이 명 (,로 여러명 구분 가능)"
          />
        </RegisterInputSet>

        <RegisterInputSet labelValue="출판사">
          <TextInput
            value={bookPublisher}
            maxLength={100}
            onChange={e => setBookPublisher(e.target.value)}
            placeholder="출판사 명"
          />
        </RegisterInputSet>

        <RegisterInputSet labelValue="책 라벨">
          <TextInput
            value={bookLabel}
            maxLength={100}
            onChange={e => setBookLabel(e.target.value)}
            placeholder="예) 자기계발"
          />
        </RegisterInputSet>

        <RegisterInputSet labelValue="책 카테고리">
          <div style={{width: '90%', display: 'flex', flexDirection: 'row'}}>
            <CategorySelect
              type="gray"
              size="md"
              categoryList={BOOK_CATEGORY}
              setSelectLargeCategoryKey={setSelectLargeCategoryKey}
              selectLargeCategory={selectLargeCategoryKey}
              defaultValue="대분류 카테고리"
            />
            <CategorySelect
              type="gray"
              size="md"
              categoryList={BOOK_CATEGORY}
              setSelectLargeCategoryKey={setSelectLargeCategoryKey}
              selectLargeCategory={selectLargeCategoryKey}
              setSelectSmallCategoryKey={setSelectSmallCategoryKey}
              isSubCategory
              defaultValue="소분류 카테고리"
            />
          </div>
        </RegisterInputSet>


        <RegisterInputSet labelValue="책 종류">
          <Select
            selectList={BOOK_TYPE_LIST}
            defaultValue="종이책"
            setSelectValue={setKindOfBook}
            type="gray"
            size="md"
          />
        </RegisterInputSet>

        {(kindOfBook === 'ebook') && (
          <RegisterInputSet labelValue="E-book 링크">
            <TextInput
              value={bookLink}
              onChange={e => setBookLink(e.target.value)}
              placeholder="url"
            />
          </RegisterInputSet>
        )}


        <RegisterInputSet labelValue="출판 일자">
          <input
            type="date"
            onChange={handleBookDatetime}
            value={bookDateTime}/>
        </RegisterInputSet>

      </div>


      <div className="registerBtnWrap">
        <Button
          classType="transparent"
          size="md"
          handleClick={() => history.replace(SERVICE_ADD_BOOKS)}
        >
          등록 취소
        </Button>
        <Button
          classType="primary"
          size="md"
          handleClick={handleRegisterBook}
        >
          도서 등록
        </Button>
      </div>
    </div>
  )
}

export default RegisterBook
