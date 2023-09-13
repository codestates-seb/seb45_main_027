import axios from "axios";
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 요청 인터셉터 추가하기
api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    config.headers["authorization-refresh"] = refreshToken;
    config.headers["authorization"] = accessToken;
    config.withCredentials = true;
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    if (response.headers["authorization"]) {
      localStorage.setItem("accessToken", response.headers["authorization"]);
    }
    if (response.headers["authorization-refresh"]) {
      localStorage.setItem(
        "refreshToken",
        response.headers["authorization-refresh"]
      );
    }
    console.log("interceptor response", response);
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행

    return Promise.reject(error);
  }
);

export default api;
