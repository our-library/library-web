import {Api} from "./index";

export function fetchGroupMe() {
  return Api.fetch({
    url: 'groups/me',
    method: 'get',
  })
}

export function joinGroupRequest(invitationKey, jobKey) {
  return  Api.fetch({
    url: '/groups/join',
    method: 'post',
    data: { invitationKey, jobKey }
  })
}

export function makeGroupRequest({category, groupName, jobKey}) {
  return Api.fetch({
    url: '/groups',
    method: 'post',
    data: {category, groupName, jobKey}
  })
}
