import { Api } from './index';

export function fetchUserProfile() {
  return Api.fetch({
    url: '/users/me/profile',
    method: 'get',
  });
}
