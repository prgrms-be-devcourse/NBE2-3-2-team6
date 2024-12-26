import axios from "axios";

const socialApi = axios.create({
  withCredentials: true,
});

// 에러 처리를 위한 기본적인 인터셉터만 추가
socialApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 소셜 로그인 관련 에러 처리
    console.error("Social Login Error:", error.response?.data || error.message);

    // 에러가 발생하면 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default socialApi;
