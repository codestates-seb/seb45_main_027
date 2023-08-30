import React from "react";
import FooterPc from "./FooterPc";
import FooterMobile from "./FooterMobile";

const HiddenFooter = () => (
  <>
    <div className="hidden md:block">
      <FooterPc />
    </div>
    <div className="md:hidden">
      <FooterMobile />
    </div>
  </>
);

export default HiddenFooter;
