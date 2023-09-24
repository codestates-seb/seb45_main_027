import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import api from "../common/tokens";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  const handleAccountDeletion = async () => {
    const confirmDeletion = window.confirm(
      "계정을 정말 삭제하시겠습니까? \n확인을 누른경우 취소할 수 없습니다."
    );

    if (confirmDeletion) {
      try {
        await api.delete(`/members/${memberId}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("memberId");
        alert("계정을 성공적으로 삭제하였습니다.");
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
