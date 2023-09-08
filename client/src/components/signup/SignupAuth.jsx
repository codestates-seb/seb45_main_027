import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleEmailSubmit = async () => {
    try {
      // 이메일이 존재하는지 확인
      //await axios.post(`${baseURL}/auth/email`, { email });

      //setStep("code");
      alert(`We've sent you a verification code to your email address.`);
    } catch (error) {
      alert("Email does not exist.");
      console.error("Password reset initiation failed:", error);
    }
  };

  const handleVerificationCodeSubmit = async () => {
    try {
      // 서버에서 유저 이메일로 인증코드 전송
      // 서버로 이메일과 유저가 입력한 인증코드를 보내줌
      //await axios.post(`${baseURL}/email/check `, { email, code });

      alert("Succefully Verified.");
      navigate("/login");
    } catch (error) {
      console.error("Verification code validation failed:", error);
    }
  };

  const inputStyle =
    "text-xl px-4 py-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-[#00647B]/30";
  const labelStyle = "flex justify-start text-2xl font-medium mt-6 mb-2 ml-2";
  const verifyButtonStyle = "bg-[#00647B] text-white text-xl font-medium px-4 py-3 mb-2 ml-1 rounded-md hover:bg-[#00647B]/80"
  const buttonStyle =
    "flex self-center bg-[#00647B] text-white text-2xl font-medium rounded-md px-4 py-2 mt-[10%] hover:bg-[#00647B]/80";

  return (
    <div className="flex flex-col justify-center items-center border bg-white opacity-[95%] text-[#00647B] min-w-[30%] mt-20 mb-40 py-14">
      <div className='text-5xl font-medium mb-[5%]'>Activate Account</div>
      <div>
        <label className={labelStyle}>Verify your email address</label>
        <input
          type="email"
          placeholder="Email"
          className={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className={verifyButtonStyle} onClick={handleEmailSubmit}>Verify</button>

        <label className={labelStyle}>Enter Verification Code</label>
        <input
          type="text"
          placeholder="Verification Code"
          className={`${inputStyle} w-full`}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <button className={buttonStyle} onClick={handleVerificationCodeSubmit}>
      Login Now
      </button>
    </div>
  );
};

export default SignupAuth;
