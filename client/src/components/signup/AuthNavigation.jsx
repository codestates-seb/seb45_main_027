import { Link } from "react-router-dom";

const AuthNavigation = ({path}) => {
    return (
        <div className="flex flex-row text-black">
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
    );
}

export default AuthNavigation