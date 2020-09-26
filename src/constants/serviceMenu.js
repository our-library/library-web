import { ROUTE_PATH } from './path';

const {
  SERVICE_BOOK_LIST,
  SERVICE_ADD_BOOKS,
  SERVICE_MY_RENT,
  SERVICE_MEMBER_MANAGEMENT,
  SERVICE_INQUIRY,
  SERVICE_SETTING,
} = ROUTE_PATH;

export const defaultUserMenu = [
  {
    pathname: SERVICE_BOOK_LIST,
    menuValue: '전체 책 목록',
  },
  {
    pathname: SERVICE_MY_RENT,
    menuValue: '나의 대여',
  },
  {
    pathname: SERVICE_SETTING,
    menuValue: '설정',
  },
];

export const GroupMasterMenu = [
  {
    pathname: SERVICE_BOOK_LIST,
    menuValue: '전체 책 목록',
  },
  {
    pathname: SERVICE_ADD_BOOKS,
    menuValue: '책 등록',
  },
  {
    pathname: SERVICE_MY_RENT,
    menuValue: '나의 대여',
  },
  {
    pathname: SERVICE_MEMBER_MANAGEMENT,
    menuValue: '회원관리',
  },
  {
    pathname: SERVICE_INQUIRY,
    menuValue: '문의',
  },
  {
    pathname: SERVICE_SETTING,
    menuValue: '설정',
  },
];
