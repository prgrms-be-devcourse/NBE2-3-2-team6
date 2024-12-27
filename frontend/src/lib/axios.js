import axios from "axios";

export const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // refresh token이 쿠키에 있으므로 필수
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.access = token;
    }
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 토큰이 만료되어 401 에러가 발생했고, 재시도하지 않은 요청일 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // /auth/reissue 엔드포인트 호출
        const response = await axios.post(
          "http://localhost:8080/auth/reissue",
          {},
          {
            withCredentials: true, // 쿠키 전송을 위해 필수
          }
        );

        // 새로운 액세스 토큰을 localStorage에 저장
        const newAccessToken = response.headers["access"];
        localStorage.setItem("accessToken", newAccessToken);

        // 원래 요청의 Authorization 헤더를 새 토큰으로 업데이트
        originalRequest.headers.Authorization = newAccessToken;

        // 실패했던 요청 재시도
        return instance(originalRequest);
      } catch (error) {
        // 토큰 재발급 실패시 (리프레시 토큰 만료 등)
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
