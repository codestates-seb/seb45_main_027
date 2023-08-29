import React from "react";
import Background from "../components/common/Background";

const Signup = () => {
  return (
    <Background
      mainclassName="h-10 p-8 border-b"
      divclassName="justify-between items-center"
      style={{
        background: "url('/images/SignupBackground.png')",
        backgroundPosition: "center", // 이미지 위치
        backgroundSize: "cover", // 이미지 꽉차게
        backgroundRepeat: "no-repeat", // 이미지 반복 지정
        height: "100vh",
      }}
    >
      <div>가입페이지</div>
    </Background>
  );
};

export default Signup;
