import axios from "axios";
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// 토큰 정보를 헤더에 추가하는 함수
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

// import axios from "axios";
// import { toast } from "react-hot-toast";

// const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// // 클라이언트에서 403 오류가 발생했을 때 호출되는 함수
// const handle403Error = async () => {
//   const refreshToken = localStorage.getItem("refreshToken");

//   try {
//     // 리프레시 토큰을 사용하여 새로운 엑세스 토큰 요청
//     const response = await api.post("/refresh-token", {
//       refreshToken,
//     });

//     // 새로운 엑세스 토큰을 받았을 때
//     if (response.status === 200) {
//       const newAccessToken = response.data.accessToken;

//       // 새로운 엑세스 토큰을 로컬 스토리지에 저장
//       localStorage.setItem("accessToken", newAccessToken);

//       // 이전 요청을 다시 시도할 수 있도록 axios 인스턴스를 리셋
//       api.defaults.headers.common["authorization"] = newAccessToken;

//       // 이전 요청을 다시 시도
//       // ...
//     }
//   } catch (error) {
//     // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 얻는 데 실패한 경우
//     // 로그아웃 또는 다른 조치를 취할 수 있음
//     console.error("Error refreshing access token:", error);
//   }
// };

// // 요청/응답 인터셉터 추가하기
// api.interceptors.request.use(
//   async function (config) {
//     // 요청이 전달되기 전에 작업 수행
//     const accessToken = localStorage.getItem("accessToken");
//     config.headers["authorization"] = accessToken;
//     config.withCredentials = true;
//     return config;
//   },
//   function (error) {
//     // 요청 오류가 있는 작업 수행
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   function (response) {
//     // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 데이터가 있는 작업 수행
//     if (response.headers["authorization"]) {
//       localStorage.setItem("accessToken", response.headers["authorization"]);
//     }
//     if (response.headers["authorization-refresh"]) {
//       localStorage.setItem(
//         "refreshToken",
//         response.headers["authorization-refresh"]
//       );
//     }
//     return response;
//   },
//   function (error) {
//     // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
//     // 응답 오류가 있는 작업 수행
//     if (error.response && error.response.status === 403) {
//       // 403 오류가 발생하면 엑세스 토큰 갱신을 시도
//       handle403Error();
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
