import React from 'react';
import { useNavigate } from "react-router";
import axios from "axios";

const DeleteAccount = () => {

    const navigate = useNavigate();
   
    const handleAccountDeletion = async () => {
        const confirmDeletion = window.confirm(
          "Are you sure you want to delete your account? This action cannot be undone."
        );
    
        if (confirmDeletion) {
          try {
            axios.delete("/members/memberid수정필요");
            alert("Account deleted!");
            navigate("/");
          } catch (error) {
            console.error("Account deletion failed:", error);
          }
        }
      };

      const deleteTabStyle =
      "bg-[#f50c1b]/80 text-white text-lg font-medium rounded-lg px-2 hover:bg-[#f50c1b]/60";  

    return (
        <button
            onClick={handleAccountDeletion}
            className={`${deleteTabStyle}`}
          >
            Delete Account
          </button>
    );
}

export default DeleteAccount