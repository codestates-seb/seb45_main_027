import { useLocation } from "react-router-dom";
import OauthLayout from "./OauthLayout";
//import FormLayout from "./FormLayout";
import AuthNavigation from "./AuthNavigation";
import FormValidation from "./FormValidation";

const SignupLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="flex flex-col justify-center items-center text-[#00647B] min-w-[30%] mt-12 mb-40">
      <div className="flex justify-center text-7xl font-medium mb-[9%]">
        {path === "signup" ? `Sign Up!` : `Login!`}
      </div>
      <FormValidation path={path} />
      <div className="flex flex-col justify-center items-center mt-[5%] text-xl">
        <AuthNavigation path={path} />
        <OauthLayout />
      </div>
    </div>
  );
};

export default SignupLayout;
