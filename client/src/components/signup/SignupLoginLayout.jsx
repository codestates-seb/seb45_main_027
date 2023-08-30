import { Link, useLocation } from "react-router-dom";
import OauthLayout from "./OauthLayout";
import FormLayout from "./FormLayout";

const SignupLayout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const inputStyle =
    "px-4 py-3.5 mb-6 border rounded-full focus:outline-none focus:ring focus:border-blue-300";
  const labelStyle = "text-3xl font-medium mb-2 ml-2";
  const buttonStyle =
    "bg-[#00647B] text-white text-5xl font-medium rounded-full px-[5%] py-[5%] mt-[10%] mx-[8%] hover:bg-[#00647B]/80";

  return (
    <div className="flex flex-col justify-center text-[#00647B] min-w-[30%]">
      <div className="flex justify-center text-7xl font-medium mb-[12%]">
        {path === "signup" ? `Sign Up!` : `Login!`}
      </div>
      <FormLayout
        labelStyle={labelStyle}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        path={path}
      />
      <div className="flex flex-col justify-center items-center mt-[5%] text-xl">
        <div className="flex flex-row text-black">
          <div className="mr-2">
            {path === "signup"
              ? "Already have an account?"
              : `Don't have an account`}
          </div>
          {path === "signup" ? (
            <Link to="/login">
              <div className="text-red-700 ">Login</div>
            </Link>
          ) : (
            <Link to="/signup">
              <div className="text-red-700 ">Sign Up</div>
            </Link>
          )}
        </div>
        <OauthLayout />
      </div>
    </div>
  );
};

export default SignupLayout;
