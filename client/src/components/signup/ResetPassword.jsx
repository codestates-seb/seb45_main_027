import React, { useState } from "react";
//import axios from "axios";
import api from "../common/tokens";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const baseURL = process.env.REACT_APP_API_URL;
  const handleEmailSubmit = async () => {
    try {
      // 이메일이 존재하는지 확인
      await api.post(`${baseURL}/auth/email/password`, {
        email,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      alert(`We've sent you a new password to your email address.`);
    } catch (error) {
      alert("Email does not exist.");
    }
  };
  return (
    <form className="flex flex-col my-8">
      <label htmlFor="email" className="text-[#525252] text-[12px]">
        Reset your Password
      </label>
      <div>
        <input
          type="email"
          id="email"
          placeholder="Email you signed up with"
          className="border rounded-md focus:outline-none focus:ring focus:border-blue-300 mr-1.5 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleEmailSubmit}
          className="hover:bg-[#00647bb4]/10 p-2.5 rounded-md text-bold"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ResetPassword;
