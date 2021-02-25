import {atom, selector} from 'recoil';

//카테고리
export const selectMainCategoryAtom = atom({
  key: 'selectMainCategory',
  default: 0
});

export const selectSubCategoryAtom = atom({
  key: 'selectSubCategory',
  default: 0
});


// 책 검색 결과
export const bookSearchValueAtom = atom({
  key: 'bookSearchValue',
  default: ''
});

// 책 추가 검색 결과
export const addBookSearchValueAtom = atom({
  key: 'addBookSearchValue',
  default: ''
});

// 책 필터 - 정렬 기준
export const bookSortValueAtom = atom({
  key: 'bookSortValue',
  default: ''
});

// 책 필터 - 대여 가능 여부
export const isBookRentAvailableFilterAtom = atom({
  key: 'isBookRentAvailableFilter',
  default: ''
});
