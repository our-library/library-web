import {Api} from "../index";

export function registerBook(data) {
  return Api.fetch({
    method: 'post',
    url: '/books',
    data: data
  });
}
