// MainSection.js
import React from "react";
import MainWrap from "./MainWrap";
import Background from "../common/Background";
import MainSrogan from "./MainSlogan";

const MainSection = ({
  id,
  background,
  title,
  subTitle,
  intro1,
  intro2,
  intro3,
  paddingX,
  linkTo,
  pageImg
}) => {
  return (
    <div id={id}>
      <Background
        mainclassName=""
        divclassName="items-center justify-around"
        style={{
          background,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        <MainWrap
          mainTitle={title}
          subTitle={subTitle}
          intro1={intro1}
          intro2={intro2}
          intro3={intro3}
          paddingX={paddingX}
          linkTo={linkTo}
          pageImg={pageImg}
        />
      </Background>
      <MainSrogan />
    </div>
  );
};

export default MainSection;
