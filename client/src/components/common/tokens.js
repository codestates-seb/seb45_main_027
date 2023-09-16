import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 토큰 정보를 헤더에 추가하는 함수.0dff
const addTokenToHeaders = (config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  config.withCredentials = true;

  // 헤더 값을 콘솔에 출력
  // console.log("Request Headers:", config.headers);

  return config;
};

api.interceptors.request.use(addTokenToHeaders);

api.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 403) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 서버에서 얻는 로직이
          // 이미 서버 측에서 구현되어 있다고 가정
          // 서버에서 새로운 엑세스 토큰을 발급받고 이전 요청을 다시 시도하도록 설정
          return api.request(error.config);
        } catch (error) {
          console.error("Error refreshing access token:", error);
        }
      }

      // 리프레시 토큰이 없거나 엑세스 토큰을 얻을 수 없는 경우 로그아웃 또는 다른 처리 수행
      window.dispatchEvent(new Event("logoutEvent"));
    }

    return Promise.reject(error);
  }
);

export default api;
