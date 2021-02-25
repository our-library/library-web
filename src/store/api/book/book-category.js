import {Api} from "../index";


export function fetchBookCategory() {
  return Api.fetch({
    method: 'get',
    url: `/category`,
  });
}

