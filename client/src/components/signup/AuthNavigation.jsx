import { useState } from "react";
import { Link } from "react-router-dom";
import ResetPassword from "./ResetPassword";

const AuthNavigation = ({ path }) => {
  const [showResetPassword, setShowResetPassword] = useState(false);

  const toggleResetPassword = () => {
    setShowResetPassword(!showResetPassword);
  };

  return (
    <>
      {path === "login" && (
        <>
          <div>
            <span onClick={toggleResetPassword} className="cursor-pointer">
              Forgot password?
            </span>
          </div>
          {showResetPassword && <ResetPassword />}
        </>
      )}
      <div className="flex flex-row text-black my-5">
        <div className="mr-2">
          {path === "signup"
            ? "Already have an account?"
            : `Don't have an account`}
        </div>
        {path === "signup" ? (
          <Link to="/login">
            <div className="text-red-600 ">Login</div>
          </Link>
        ) : (
          <Link to="/signup">
            <div className="text-red-600 ">Sign Up</div>
          </Link>
        )}
      </div>
      <div className="text-black">or</div>
    </>
  );
};

export default AuthNavigation;
