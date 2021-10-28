import React from 'react';

export const VALID_MESSAGE = {
  userName: '이름을 입력해주세요',
  email: '이메일 주소를 다시 확인해주세요.',
  alreadyUse: '이미 사용중인 이메일입니다.',
  LengthError: '8자 이상 입력해주세요.',
  ValidError: '영문, 숫자, 특수문자 중 2가지 조합 8자리 이상 입력해주세요.',
  SameWordError: '연속된 문자는 입력할 수 없습니다.',
  BlankError: '공백은 포함할 수 없습니다.',
  EmailIncludeError: '비밀번호에 아이디는 포함시킬 수 없습니다.',
  rePasswordNotMatch: '비밀번호가 일치하지 않습니다.'
};

export type TermType = {
  title: string;
  contents: Array<string>;
  isChecked?: boolean;
  onClickHandler?: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
};
export const GENERAL_TERM_AGREEMENT: Array<TermType> = [
  {
    title: '제 1조 (총칙)',
    contents: [
      '제 1 조 (목적)',
      '이 약관은 산림청이 제공하는 산림탄소등록부(이하 "등록부"라 함)와 관련 제반 서비스의 이용과 관련하여 회원과 산림청간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
      '제 2 조 (용어의 정의)',
      '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
      '이용자 : 서비스에 접속하여 산림청(산림탄소상쇄제도 운영기관인'
    ]
  },
  {
    title: '제 2조 (용어의 정의)',
    contents: [
      '제 1 조 (목적)',
      '이 약관은 산림청이 제공하는 산림탄소등록부(이하 "등록부"라 함)와 관련 제반 서비스의 이용과 관련하여 회원과 산림청간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
      '제 2 조 (용어의 정의)',
      '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
      '이용자 : 서비스에 접속하여 산림청(산림탄소상쇄제도 운영기관인'
    ]
  }
];

export const PRIVATE_TERM_AGREEMENT = [
  {
    title: '제 1조 (총칙)',
    contents: [
      '제 1 조 (목적)',
      '이 약관은 산림청이 제공하는 산림탄소등록부(이하 "등록부"라 함)와 관련 제반 서비스의 이용과 관련하여 회원과 산림청간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
      '제 2 조 (용어의 정의)',
      '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
      '이용자 : 서비스에 접속하여 산림청(산림탄소상쇄제도 운영기관인'
    ]
  },
  {
    title: '제 2조 (용어의 정의)',
    contents: [
      '제 1 조 (목적)',
      '이 약관은 산림청이 제공하는 산림탄소등록부(이하 "등록부"라 함)와 관련 제반 서비스의 이용과 관련하여 회원과 산림청간의 권리, 의무 및 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.',
      '제 2 조 (용어의 정의)',
      '이 약관에서 사용하는 용어의 정의는 다음과 같습니다.',
      '이용자 : 서비스에 접속하여 산림청(산림탄소상쇄제도 운영기관인'
    ]
  },
  {
    title: '12. 고지의 의무',
    contents: [
      '현 개인정보취급방침은 2019년 6월 1일에 제정되었으며, 정부 및 회사의 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 경우에는 개정 최소 7일 전부터 서비스의’공지사항’ 란을 통해 고지하며, 본 정책은 공지한 날로부터 시행됩니다.'
    ]
  }
];