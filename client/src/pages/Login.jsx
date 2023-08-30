import React from "react";
import Background from "../components/common/Background";
import SignupLoginLayout from "../components/signup/SignupLoginLayout";

const Login = () => {
  return (
    <Background
      mainclassName=""
      divclassName="justify-center items-center"
      style={{
        background: "url('/images/backgrounLogin.png')",
        backgroundPosition: "center", // 이미지 위치
        backgroundSize: "cover", // 이미지 꽉차게
        backgroundRepeat: "no-repeat", // 이미지 반복 지정
        height: "100vh",
      }}
    >
      <SignupLoginLayout />
    </Background>
  );
};

export default Login;
