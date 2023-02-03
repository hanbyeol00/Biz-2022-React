export const USER_JOIN_RES = {
  REQ_USERNAME: {
    CODE: "REQ_USERNAME",
    CODE_NUM: 400,
    SUB_CODE: "USERNAME",
    MESSAGE: "이메일은 필수 항목입니다.",
  },
  OVERLAP_USERNAME: {
    CODE: "OVERLAP_USERNAME",
    CODE_NUM: 401,
    SUB_CODE: "USERNAME",
    MESSAGE: "이미 가입된 USERNAME입니다",
  },

  REQ_NICKNAME: {
    CODE: "REQ_NICKNAME",
    CODE_NUM: 400,
    SUB_CODE: "NICKNAME",
    MESSAGE: "닉네임은 필수 항목입니다.",
  },

  OVERLAP_NICKNAME: {
    CODE: "OVERLAP_NICKNAME",
    CODE_NUM: 401,
    MESSAGE: "이미 존재하는 닉네임입니다",
  },

  REQ_PASSWORD: {
    CODE: "REQ_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "비밀번호는 필수 항목입니다.",
  },

  REQ_RE_PASSWORD: {
    CODE: "REQ_RE_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "비밀번호 확인을 입력해주세요.",
  },

  MATCH_NOT_RE_PASSWORD: {
    CODE: "MATCH_NOT_RE_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
  },

  USER_NOT_CREATE: {
    CODE: "USER_NOT_CREATE",
    CODE_NUM: 500,
    MESSAGE: "회원가입에 실패했습니다",
  },
  USER_NOT_SESSION: {
    CODE: "USER_NOT_SESSION",
    CODE_NUM: 403,
    MESSAGE: "로그인 정보 없음",
  },
};

export const USER_LOGIN_RES = {
  MATCH_NOT_USERNAME: {
    CODE: "MATCH_NOT_USERNAME",
    CODE_NUM: 400,
    SUB_CODE: "USERNAME",
    MESSAGE: "가입되지 않은 아이디 입니다",
  },

  MATCH_NOT_PASSWORD: {
    CODE: "MATCH_NOT_PASSWORD",
    CODE_NUM: 400,
    SUB_CODE: "PASSWORD",
    MESSAGE: "비밀번호가 일치하지 않습니다.",
  },

  USER_NOT_LOGIN: {
    CODE: "USER_NOT_LOGIN",
    CODE_NUM: 500,
    MESSAGE: "로그인에 실패했습니다",
  },
};

export const SYSTEM_RES = {
  SQL_ERROR: {
    CODE: "SQL_ERROR",
    CODE_NUM: 500,
    MESSAGE: "SQL 오류 발생 관리자에게 문의",
  },

  FETCH_ERROR: {
    CODE: "FETCH_ERROR",
    CODE_NUM: 500,
    MESSAGE: "API 서버로부터 데이터를 가져올 수 없음 관리자에게 문의",
  },

  JSON_ERROR: {
    CODE: "JSON_ERROR",
    CODE_NUM: 500,
    MESSAGE: "JSON Data Type  변환 오류 관리자에게 문의",
  },

  INTERNAL_ERROR: {
    CODE: "INTERNAL_ERROR",
    CODE_NUM: 500,
    MESSAGE: "서버 내부 연산중 오류 발생 관리자에게 문의",
  },
};
