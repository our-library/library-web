import Cookies from 'js-cookie';


export function setGroupCount(count) {
  Cookies.set('groupCount', count, {expires: 1});
}

export function getGroupCount() {
  return Cookies.get('groupCount');
}

export function removeGroupCount() {
  Cookies.remove('groupCount');
}
