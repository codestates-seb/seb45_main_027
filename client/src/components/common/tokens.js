import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 요청에 토큰을 추가하는 함수
const addTokenToHeaders = (config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  config.withCredentials = true;

  return config;
};

// 토큰 갱신 및 재시도 함수 (403에러 반환시 실행함수)
const handleTokenRefresh = async (error) => {
  // 로컬스토리지에 저장되어있는 엑세스토큰과 리프레시토큰 추출
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (refreshToken) {
    try {
      // 요청보낸 메서드와 url, data(바디값) 저장
      const { method, url, data } = error.config;

      // 요청보낸 메서드, url, 바디값 및
      // 추가로 헤더에 엑세스토큰과 리프레시 토큰을 전송하도록 config설정
      const configParams = {
        method,
        url: `${process.env.REACT_APP_API_URL}${url}`,
        headers: {
          "Authorization-refresh": `Bearer ${refreshToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
        data,
      };

      // 설정한 config로 다시 서버로 요청을 보냄
      const response = await axios(configParams);

      // 성공적으로 응답시 새로운 엑세스토큰과 리프레시토큰을 로컬스토리지에 저장
      const newAccessToken = response.headers.authorization;
      const newRefreshToken = response.headers["authorization-refresh"];
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // 헤더에 새로운 엑세스토큰을 받은뒤 서버로 재요청
      error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api.request(error.config);
    } catch (err) {
      // 응답없는경우 로그아웃
      window.dispatchEvent(new Event("logoutEvent"));
      console.log(err);
    }
  } else {
    window.dispatchEvent(new Event("logoutEvent"));
    console.log("리프레시 토큰 없음");
  }
};

// 요청 인터셉터 설정
api.interceptors.request.use(addTokenToHeaders);

// 응답 인터셉터 설정
api.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 403) {
      // 엑세스 토큰 만료 시 토큰 갱신 및 재시도
      return handleTokenRefresh(error);
    }

    return Promise.reject(error);
  }
);

export default api;
