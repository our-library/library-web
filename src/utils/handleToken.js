import Cookies from 'js-cookie';

// const baseUrl = 'http://api.ourlibrary.co.kr/';

export function setToken(token) {
  Cookies.set('userToken', token, { expires: 1 });
}

export function getToken() {
  return Cookies.get('userToken');
}

export function removeToken() {
  Cookies.remove('userToken');
}
