import { useLocation } from "react-router-dom";
import OauthLayout from "./OauthLayout";
import FormLayout from "./FormLayout";
import AuthNavigation from "./AuthNavigation";

const SignupLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="flex flex-col justify-center text-[#00647B] min-w-[30%]">
      <div className="flex justify-center text-7xl font-medium mb-[12%]">
        {path === "signup" ? `Sign Up!` : `Login!`}
      </div>
      <FormLayout path={path} />
      <div className="flex flex-col justify-center items-center mt-[5%] text-xl">
        <AuthNavigation path={path} />
        <OauthLayout />
      </div>
    </div>
  );
};

export default SignupLayout;
