import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
//import { useAuth } from "../../context/AuthContext";

const DeleteAccount = () => {
  //const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  

  const baseURL = process.env.REACT_APP_API_URL;
  

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDeletion) {
      try {
        await axios.delete(`${baseURL}/members/${memberId}`);
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("memberId");
        alert("Account deleted!");
        navigate("/");
      } catch (error) {
        console.log("Account deletion failed:", error);
      }
    }
  };

  const deleteTabStyle =
    "bg-[#f50c1b]/80 text-white text-lg font-medium rounded-lg px-2 hover:bg-[#f50c1b]/60";

  return (
    <button onClick={handleAccountDeletion} className={`${deleteTabStyle}`}>
      Delete Account
    </button>
  );
};

export default DeleteAccount;
