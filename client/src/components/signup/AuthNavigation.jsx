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
            <span
              onClick={toggleResetPassword}
              className="cursor-pointer hover:font-semibold">
              Forgot password?
            </span>
          </div>
          {showResetPassword && <ResetPassword />}
        </>
      )}
      <div className="flex flex-row text-[#555] mb-10 mt-2">
        <div className="mr-2">
          {path === "signup"
            ? "Already have an account?"
            : `Don't have an account`}
        </div>
        {path === "signup" ? (
          <Link to="/login">
            <div className="text-red-600 hover:font-semibold">Login</div>
          </Link>
        ) : (
          <Link to="/signup">
            <div className="mx-2 text-red-600 hover:font-semibold">
              Sign Up
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default AuthNavigation;
