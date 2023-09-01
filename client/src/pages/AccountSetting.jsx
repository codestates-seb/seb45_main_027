import React from "react";
import Background from "../components/common/Background";
import EditProfile from "../components/accountSetting/EditProfile";

const AccountSetting = () => {
  return (
    <>
      <Background
        mainclassName=""
        divclassName="justify-center "
        style={{
          background: "url('/images/backgrounLogin.png')",
          backgroundPosition: "center", // 이미지 위치
          backgroundSize: "cover", // 이미지 꽉차게
          backgroundRepeat: "no-repeat", // 이미지 반복 지정
          height: "h-full",
        }}
      >
       <EditProfile />
      </Background>
    </>
  );
};

export default AccountSetting;
