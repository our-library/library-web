import { Api } from '../index';
import axios from 'axios';

export function fetchBookList(query) {
  return Api.fetch({
    method: 'get',
    url: '/books',
    params: query
  });
}


export function fetchBook(bookId) {
  return Api.fetch({
    method: 'get',
    url: `/books/${bookId}`,
  });
}

export function editBook(bookId) {
  return Api.fetch({
    method: 'put',
    url: `/books/${bookId}`,
  });
}






