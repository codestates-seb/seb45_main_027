import { useLocation } from "react-router-dom";
import OauthLayout from "./OauthLayout";
import AuthNavigation from "./AuthNavigation";
import FormValidation from "./FormValidation";

const SignupLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="flex flex-col justify-center items-center border bg-white opacity-[95%] text-[#00647B] min-w-[30%] mt-20 mb-40 py-14 rounded-md">
      <div className="flex justify-center text-5xl font-medium mb-[5%] Showcard-Gothic">
        {path === "signup" ? `Sign Up!` : `Login!`}
      </div>
      <FormValidation path={path} />
      <div className="flex flex-col justify-center items-center mt-[5%] text-xl">
        <AuthNavigation path={path} />
        <OauthLayout path={path}/>
      </div>
    </div>
  );
};

export default SignupLayout;
