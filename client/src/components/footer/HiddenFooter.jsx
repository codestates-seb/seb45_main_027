import React from "react";
import { useLocation } from "react-router-dom";
import FooterPc from "./FooterPc";
import FooterMobile from "./FooterMobile";
import FooterMobileWrite from "./FooterMobileWrite";

const HiddenFooter = () => {
    const location = useLocation();
    const path = location.pathname;

    const isWrite =
      path.includes("/tips/write") || path.includes("/showroom/write");

    return (
      <>
        <div className="hidden md:block">
          <FooterPc />
        </div>
        <div className="md:hidden">
          {isWrite ? <FooterMobileWrite /> : <FooterMobile />}
        </div>
      </>
    );
}

export default HiddenFooter;
