export const MODAL_DATA = {
  INVITE_PEOPLE_MODAL: {
    title: '구성원 초대하기',
    subTitle: '',
    description:
      '초대할 구성원에게 코드를 복사해서 전달해 주세요. 가입시 초대 코드를 입력하면 그룹 구성원으로 추가됩니다.',
    isConfirmBtn: false,
    isCloseBtn: true,
  },
};

export const ERROR_MODAL_DATA = {
  LOGIN_ERROR: {
    title: '로그인 안내',
    description: '아직 가입하지 않았거나 비밀번호를 잘못 입력했어요. 확인하고 다시 입력해 주세요.',
    isConfirmBtn: true,
    isCloseBtn: false,
    confirmBtnName: '다시 입력할게요.',
  },
  INVITATION_CODE_ERROR: {
    title: '초대코드 에러 안내',
    description: '초대 코드를 확인 후 다시 입력해 주세요',
    isConfirmBtn: true,
    isCloseBtn: false,
    confirmBtnName: '다시 입력할게요.',
  },
};
