import { Api } from './index';
import { removeToken, setToken } from '../../utils/handleToken';
import { removeGroupCount, setGroupCount } from '../../utils/handleUser';
import { fetchGroupMe } from './groupApi';

function loginRequest(email, password) {
  return Api.fetch({
    url: 'login/oauth',
    method: 'post',
    data: { email, password },
  });
}

export async function fetchLoginUser(email, password) {
  const { token } = await loginRequest(email, password);
  setToken(token);

  const groupData = await fetchGroupMe();
  const { count: userGroupCount } = groupData;
  setGroupCount(userGroupCount);

  return userGroupCount;
}

export function fetchEmailExistence(email) {
  return Api.fetch({
    url: `users/emails/${email}/existence`,
    method: 'get',
  });
}

export function EmailAuthorizeRequest(email) {
  return Api.fetch({
    url: 'email-authentications',
    method: 'post',
    data: { email },
  });
}

export function fetchEmailAuthorize(emailAuthenticationId, authenticationKey) {
  return Api.fetch({
    url: `/email-authentications/${emailAuthenticationId}/authenticate`,
    method: 'post',
    data: { authenticationKey },
  });
}

export function registerUserRequest({ name, email, password, emailAuthenticationId }) {
  return Api.fetch({
    url: 'users',
    method: 'post',
    data: { name, email, password, emailAuthenticationId },
  });
}

export async function logout() {
  await removeToken();
  await removeGroupCount();
}
