import React from "react";
import { useAuth } from "../../context/AuthContext";

const OauthLayout = ({ path }) => {
  const { kakaoLogin, naverLogin } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  console.log("Code from URL:", code);

  const kakaoRestApiKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const kakaoRedirectUrl = `http://localhost:3000/${path}`; //process.env.REACT_APP_KAKAO_REDIRECT_URL;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${kakaoRedirectUrl}&response_type=code`;

  const naverRestApiKey = process.env.REACT_APP_NAVER_REST_API_KEY;
  const naverRedirectUrl = `http://localhost:3000/${path}`;
  const naverState = "gS25x8fac3";
  const naverLoginUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${naverRestApiKey}&response_type=code&redirect_uri=${naverRedirectUrl}&state=${naverState}`;

  const handleKaKaologin = () => {
    window.location.href = kakaoLoginUrl;
    kakaoLogin(code);
  };

  const handleNaverLogin = () => {
    window.location.href = naverLoginUrl;
    naverLogin(code);
  };

  return (
    <div className="flex justify-center mt-[5%]">
      <svg
        width="70"
        height="70"
        viewBox="0 0 48 48"
        preserveAspectRatio="xMidYMid meet"
        className="mr-10"
        onClick={handleKaKaologin}
      >
        <g fill="none" fillRule="evenodd">
          <path
            fill="#FFEB00"
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
          />
          <path
            fill="#3C2929"
            d="M24 11.277c8.284 0 15 5.306 15 11.85 0 6.545-6.716 11.85-15 11.85-.92 0-1.822-.066-2.697-.191l-6.081 4.105a.43.43 0 0 1-.674-.476l1.414-5.282C11.777 31.031 9 27.335 9 23.127c0-6.544 6.716-11.85 15-11.85zm6.22 8.407c-.416 0-.718.297-.718.707v5.939c0 .41.289.686.718.686.41 0 .718-.295.718-.686v-1.932l.515-.526 1.885 2.57c.277.374.426.54.691.568.037.003.075.005.112.005.154 0 .66-.04.716-.563.038-.293-.137-.52-.348-.796l-2.043-2.675 1.727-1.743.176-.196c.234-.26.353-.39.353-.587.009-.422-.34-.652-.687-.661-.274 0-.457.15-.57.262l-2.528 2.634v-2.3c0-.422-.288-.706-.717-.706zm-9.364 0c-.56 0-.918.432-1.067.837l-2.083 5.517a.84.84 0 0 0-.065.315c0 .372.31.663.706.663.359 0 .578-.162.69-.51l.321-.97h2.999l.313.982c.111.335.34.498.7.498.367 0 .655-.273.655-.62 0-.056-.017-.196-.081-.369l-2.019-5.508c-.187-.53-.577-.835-1.069-.835zm-2.92.064h-4.452c-.417 0-.642.337-.642.654 0 .3.168.652.642.652h1.51v5.21c0 .464.274.752.716.752.443 0 .718-.288.718-.751v-5.21h1.508c.474 0 .643-.352.643-.653 0-.317-.225-.654-.643-.654zm7.554-.064c-.442 0-.717.287-.717.75v5.707c0 .497.28.794.75.794h2.674c.434 0 .677-.321.686-.627a.642.642 0 0 0-.17-.479c-.122-.13-.3-.2-.516-.2h-1.99v-5.195c0-.463-.274-.75-.717-.75zm-4.628 1.306l.008.01 1.083 3.265h-2.192L20.842 21a.015.015 0 0 1 .028 0z"
          />
        </g>
      </svg>

      <svg
        width="70"
        height="70"
        viewBox="0 0 48 48"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleNaverLogin}
      >
        <g fill="none" fillRule="evenodd">
          <path
            fill="#00C63B"
            d="M0 24C0 10.745 10.745 0 24 0s24 10.745 24 24-10.745 24-24 24S0 37.255 0 24z"
          />
          <path
            fill="#FFF"
            d="M21 25.231V34h-7V15h7l6 8.769V15h7v19h-7l-6-8.769z"
          />
        </g>
      </svg>
    </div>
  );
};

export default OauthLayout;
