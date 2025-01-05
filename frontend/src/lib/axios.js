import axios from "axios";

export const decodeJWT = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (config.url !== "/auth/reissue" && token) {
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

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
        const reissueResponse = await instance.post("/auth/reissue");
        const newToken = reissueResponse.headers["access"];

        if (!newToken) {
          localStorage.removeItem("accessToken");
          window.location.replace("/login");
          return Promise.reject(error);
        }

        localStorage.setItem("accessToken", newToken);
        error.config.headers.access = newToken;
        return instance(error.config);
      } catch (e) {
        localStorage.removeItem("accessToken");
        window.location.replace("/login");
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
