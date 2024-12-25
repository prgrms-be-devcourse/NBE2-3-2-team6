const ROLE_REDIRECTS = {
  ROLE_ADMIN: "/admin", // 관리자는 대시보드로
  ROLE_USER: "/donate", // 일반 사용자는 기부 페이지로
  DEFAULT: "/", // 그 외의 경우 홈으로
};

export const getRedirectPath = (role) => {
  return ROLE_REDIRECTS[role] || ROLE_REDIRECTS.DEFAULT;
};
