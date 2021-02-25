import {Api} from "../index";

//리뷰 추가하기
export function addReview(data) {
  return Api.fetch({
    method: 'post',
    url: 'reviews',
    data: data
  })
}

//리뷰 리스트 가져오기
export function fetchReviewList(data) {
  return Api.fetch({
    method: 'get',
    url: 'reviews',
  })
}

// 내 리뷰 가져오기
export function fetchReviewMe(data) {
  return Api.fetch({
    method: 'get',
    url: 'reviews/me',
  })
}

// 리뷰 수정하기
export function editReview(reviewId) {
  return Api.fetch({
    method: 'put',
    url: `reviews/${reviewId}`,
  })
}

// 리뷰 삭제하기
export function deleteReview(reviewId) {
  return Api.fetch({
    method: 'delete',
    url: `reviews/${reviewId}`,
  })
}


