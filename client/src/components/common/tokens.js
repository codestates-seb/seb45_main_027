import axios from "axios";

// 기본 URL을 기반으로 axios 인스턴스 생성
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 토큰 정보를 헤더에 추가하는 함수
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
    console.log(error);
    // 엑세스 토큰 만료시 ERR_NETWORK 에러가 뜨는거같음
    if (error.response && error.response.status === 403) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // 엔드포인트를 동적으로 설정할 수 있도록, api를 사용하는 곳에서 엔드포인트를 전달받음
          const endpoint = error.config.url; // 현재 요청의 엔드포인트 추출

          // 현재 요청한 곳으로 리프레시 토큰을 실어서 서버로 전송
          const response = await api.post(endpoint, {
            refreshToken,
          });
          console.log(response);

          // 유효한 리프레시 토큰일 경우 서버로부터 헤더를 통해 데이터를 전달받음
          // 새로운 엑세스 토큰과 리프레시 토큰을 받아 로컬 스토리지에 저장
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          localStorage.setItem("accessToken", newAccessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          // 오류가 발생한 요청을 재시도 ( 할필요는 없나?)
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api.request(error.config);
        } catch (err) {
          // 엑세스 토큰 재발급에 실패한 경우 로그아웃 또는 다른 처리 수행
          window.dispatchEvent(new Event("logoutEvent"));
          console.log("엑세스토큰 재발급 실패");
        }
      } else {
        // 리프레시 토큰이 없는 경우 로그아웃 또는 다른 처리 수행
        window.dispatchEvent(new Event("logoutEvent"));
        console.log("리프레시 토큰 없음");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
