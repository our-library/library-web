import { Api } from './index';

export function loginRequest(email, password) {
  return Api.fetch({
    url: 'login/oauth',
    method: 'post',
    data: { email, password },
  });
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
