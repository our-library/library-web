import Cookies from 'js-cookie';

const baseUrl = 'http://api.ourlibrary.co.kr/';

export function setToken(token) {
  Cookies.set('userToken', token, {expires: 1})
}

export function getToken() {
  return Cookies.get('userToken');
}

function removeToken(token) {
  Cookies.remove(token);
}

function isTokenValid(token) {

}