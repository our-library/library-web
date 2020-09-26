import { Api } from './index';

export function fetchUserProfile() {
  return Api.fetch({
    url: '/users/me/profile',
    method: 'get',
  });
}

export async function fetchUserName() {
  const data = await fetchUserProfile();
  const { name } = data;
  return name;
}
