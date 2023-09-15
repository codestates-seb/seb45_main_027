import axios from "axios";
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 토큰 정보를 헤더에 추가하는 함수...
const addTokenToHeaders = (config) => {
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  if (refreshToken) {
    config.headers["RefreshToken"] = refreshToken;
  }
  if (accessToken) {
    config.headers["AccessToken"] = accessToken;
  }

  config.headers["Content-Type"] = "application/json";
  config.headers["ngrok-skip-browser-warning"] = "69420";
  config.withCredentials = true;

  return config;
};

// rquest에서는 에러처리 X
// 네트워크 에러는 인터셉터의 response 핸들러에서 처리됨
// 따라서 인터셉터를 사용하는 경우 요청 코드 내에서 예외 처리를 중복해서 구현할 필요가 없음
api.interceptors.request.use(addTokenToHeaders);

api.interceptors.response.use(
  function (res) {
    if (res.headers.accesstoken) {
      const accessToken = res.headers.accesstoken;
      localStorage.setItem("accessToken", accessToken);
    }
    if (res.headers.refreshtoken) {
      const refreshToken = res.headers.refreshtoken;
      localStorage.setItem("refreshToken", refreshToken);
    }
    return res;
  },
  function (err) {
    console.log("err", err);
    if (
      err.response &&
      err.response.data &&
      err.response.data.message === "Time Out"
    ) {
      window.dispatchEvent(new Event("logoutEvent"));
    }
    return Promise.reject(err);
  }
);

export default api;
